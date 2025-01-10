import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import globalStyle from '../styles/globalStyle';
import items from '../data/items_list'; 
import { Image } from 'expo-image';
import Item from './components/item';
import { useNavigation, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useGlobal } from '../utils/globalProvider';

export default function ItemsList() {
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(3);
  const [selectedItems, setSelectedItems] = useState([]);

  const { shoppingListSelectedItems, setShoppingListSelectedItems } = useGlobal();

  const toggleItem = (index) => {
    const newItems = selectedItems.includes(index)
      ? selectedItems.filter((item) => item !== index)
      : [...selectedItems, index];
    setSelectedItems(newItems);
  };

  const handleAddItems = () => {
    setShoppingListSelectedItems(selectedItems);
    router.back();
  }

  useEffect(() => {
    setSelectedItems(shoppingListSelectedItems);
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
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedItems.length == 0 ? 'Add Items' : `${selectedItems.length} Items Selected`,
      headerRight: () => (
        <TouchableOpacity
          style={{ margin: 15 }}
          onPress={handleAddItems}
        >
          <AntDesign name="check" size={24} color="black" />
        </TouchableOpacity>
      ),

    });
  }, [selectedItems]);

  return (
    <View style={globalStyle.mainContainer}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id || index.toString()} // Adjust key extractor
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toggleItem(index)}
            activeOpacity={1}
          >
            <View style={[globalStyle.itemContainer, { transform: selectedItems.includes(index) ? [{ scale: 1 }] : [{ scale: 0.925 }] }]}>
              <Item item={item} isToggled={selectedItems.includes(index)} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={globalStyle.centered}
      />
    </View>
  );
}
