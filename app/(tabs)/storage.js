import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router, useNavigation } from 'expo-router';
import globalStyle from '../../styles/globalStyle';
import { useGlobal } from '../../utils/globalProvider';
import Item from '../components/item';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';


export default function Storage() {
  const navigation = useNavigation();
  const { fridge, freezer, basket, setFridge, setFreezer, setBasket } = useGlobal();
  const [numColumns, setNumColumns] = useState(3);
  const [areItemsToggeable, setAreItemsToggeable] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    fridge: true,
    freezer: true,
    basket: true,
  });

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

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const toggleItem = (id) => {
    const newItems = selectedItems.includes(id)
      ? selectedItems.filter((temp) => temp !== id)
      : [...selectedItems, id];
    setSelectedItems(newItems);
    if (newItems.length === 0) {
      setAreItemsToggeable(false)
    }
  };

  const deleteItems = async () => {
    const newFridge = fridge.filter((item) => !selectedItems.includes(item.id));
    const newFreezer = freezer.filter((item) => !selectedItems.includes(item.id));
    const newBasket = basket.filter((item) => !selectedItems.includes(item.id));
    setFridge(newFridge);
    setFreezer(newFreezer);
    setBasket(newBasket);
    setSelectedItems([]);
    setAreItemsToggeable(false);
    await SecureStore.setItemAsync('fridge', JSON.stringify(newFridge));
    await SecureStore.setItemAsync('freezer', JSON.stringify(newFreezer));
    await SecureStore.setItemAsync('basket', JSON.stringify(newBasket));
    Toast.show({
      type: 'success',
      text1: 'Items deleted successfully',
    });
  }


  const renderHeader = (title, icon, mode) => (
    <View style={[globalStyle.row, { marginTop: 25, alignItems: 'center' }]}>
      <TouchableOpacity onPress={() => toggleSection(mode)}>
        <MaterialCommunityIcons
          name={expandedSections[mode] ? 'chevron-down' : 'chevron-right'}
          size={24}
          color="black"
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
      {icon}
      <Text style={[globalStyle.h2, { marginLeft: 10 }]}>{title}</Text>
      <TouchableOpacity onPress={() => router.push({ pathname: '/pickItems', params: { mode } })}>
        <View style={globalStyle.row}>
          <MaterialCommunityIcons name="plus" size={24} color="#34D585" style={{ marginLeft: 10 }} />
          <Text style={[globalStyle.h4, { marginLeft: 1, color: '#34D585' }]}>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSection = (data, title, icon, mode) => (
    <>
      {renderHeader(title, icon, mode)}
      {expandedSections[mode] && (
        <>
          {data.length === 0 ? (
            <Text style={[globalStyle.minorText, { marginLeft: 10, marginTop: 10, textAlign: 'left' }]}>
              No items in {title.toLowerCase()}
            </Text>
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => ( 
                <TouchableOpacity 
                  onPress={() => {
                    if (areItemsToggeable) { toggleItem(item.id) }
                    else router.push({ pathname: '/itemEdit/' + item.id.toString() + '?mode=' + mode})}
                  }
                  onLongPress={() => { setAreItemsToggeable(true), toggleItem(item.id) }}
                >
                  <Item item={item} isToggled={selectedItems.includes(item.id)}
                    isToggeable={areItemsToggeable} displayMode={'storage'} storageType={mode} />
                </TouchableOpacity>             
              )}
              keyExtractor={(_, index) => index.toString()}
              numColumns={numColumns}
            />
          )}
        </>
      )}
    </>
  );

  const sections = [
    { data: fridge, title: 'Fridge', icon: <MaterialCommunityIcons name="fridge" size={24} color="#033E63" />, mode: 'fridge' },
    { data: freezer, title: 'Freezer', icon: <Fontisto name="snowflake" size={24} color="#4BB1BE" />, mode: 'freezer' },
    { data: basket, title: 'Basket', icon: <Ionicons name="basket" size={24} color="#F2A202" />, mode: 'basket' },
  ];

  return (
    <View style={globalStyle.mainContainer}>
      <View style={globalStyle.row}>
        <View style={{ flex : 9}}>
          <Text style={globalStyle.h1}>Storage</Text>
        </View>
        {selectedItems.length > 0 && (
          <View style={{ flex : 1, marginTop: 22.5}}>
            <TouchableOpacity onPress={() => deleteItems()}>
              <MaterialCommunityIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={sections}
        renderItem={({ item }) => renderSection(item.data, item.title, item.icon, item.mode)}
        keyExtractor={(item) => item.mode}
      />
    </View>
  );
}
