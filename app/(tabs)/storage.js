import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router, useNavigation } from 'expo-router';
import globalStyle from '../../styles/globalStyle';
import { useGlobal } from '../../utils/globalProvider';
import Item from '../components/item';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';


export default function Storage() {
  const navigation = useNavigation();

  const { fridge, freezer, basket } = useGlobal();

  const [numColumns, setNumColumns] = useState(3);

  useEffect(() => {
    const calculateColumns = () => {
      const screenWidth = Dimensions.get('window').width - 45;
      const itemWidth = 100;
      return Math.floor(screenWidth / itemWidth);
    };

    const handleDimensionsChange = () => {
      setNumColumns(calculateColumns());
    };

    setNumColumns(calculateColumns());
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);

    return () => {
      subscription?.remove();
    };
  }, [navigation]);

  const renderHeader = (title, icon, mode) => (
    <View style={[ globalStyle.row, {marginTop: 25}]}>
      {icon}
      <Text style={[globalStyle.h2, { marginLeft: 10 }]}>{title}</Text>
      <TouchableOpacity onPress={() => router.push({ pathname: '/pickItems', params: { mode } })}>
        <Text style={[globalStyle.h4, { marginLeft: 10, color: '#34D585' }]}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = (data, title, icon, mode) => (
    <>
      {renderHeader(title, icon, mode)}
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(_, index) => index.toString()}
        numColumns={numColumns}
      />
    </>
  );

  const sections = [
    { data: fridge, title: 'Fridge', icon: <MaterialCommunityIcons name="fridge" size={24} color="black" />, mode: 'fridge' },
    { data: freezer, title: 'Freezer', icon: <Fontisto name="snowflake" size={24} color="black" />, mode: 'freezer' },
    { data: basket, title: 'Basket', icon: <Ionicons name="basket" size={24} color="black" />, mode: 'basket' },
  ];

  return (
    <View style={globalStyle.mainContainer}>
      <FlatList
        data={sections}
        renderItem={({ item }) => renderSection(item.data, item.title, item.icon, item.mode)}
        keyExtractor={(item) => item.mode}
    />
    </View>
  );
}
