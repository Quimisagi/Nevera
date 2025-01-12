import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import globalStyle from '../styles/globalStyle';
import { items, getItems } from '../data/items_list'; 
import Item from './components/item';
import { useNavigation, router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useGlobal } from '../utils/globalProvider';
import { getDayNumber } from '../utils/dateManager';
import uuid from 'uuid-random';

export default function PickItems() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [numColumns, setNumColumns] = useState(3);
  const [selectedItems, setSelectedItems] = useState([]);

  const { shoppingListAddedItems, setShoppingListAddedItems, fridge, setFridge, freezer, setFreezer, basket, setBasket } = useGlobal(); 
  const { mode } = params;

  const toggleItem = (id) => {
    const newItems = selectedItems.includes(id)
      ? selectedItems.filter((temp) => temp !== id)
      : [...selectedItems, id];
    setSelectedItems(newItems);
  };

  const handleAddItems = () => {
    if (mode == 'shoppingList'){
      setShoppingListAddedItems(selectedItems);
    }
    else {
      let tempItems = getItems(selectedItems); 
      tempItems = tempItems.map((item) => {
        return {
          ...item,
          id: uuid(),
          date: getDayNumber(),
        };
      });
      switch (mode) {
        case 'fridge':
          setFridge([...fridge, ...tempItems]);
          break;
        case 'freezer':
          setFreezer([...freezer, ...tempItems]);
          break;
        case 'basket':
          setBasket([...basket, ...tempItems]);
          break;
        default:
          break;
      }
    }
    router.back();

  }

  useEffect(() => {
    console.log('mode', mode);
    if (mode == 'shoppingList'){
      setSelectedItems(shoppingListAddedItems);
    }
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
    let title = 'Add Items';
    switch (mode) {
      case 'fridge':
        title = 'Add Items to Fridge';
        break;
      case 'freezer':
        title = 'Add Items to Freezer';
        break;
      case 'basket':
        title = 'Add Items to Basket';
        break;
      case 'shoppingList':
        title = 'Add Items to Shopping List';
        break;
      default:
        break;
    }
    navigation.setOptions({
      headerTitle: selectedItems.length == 0 ? title : `${selectedItems.length} Items Selected`,
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
            onPress={() => toggleItem(item.id)}
            activeOpacity={1}
          >
            <View style={[globalStyle.itemContainer, { transform: selectedItems.includes(item.id) ? [{ scale: 1 }] : [{ scale: 0.925 }] }]}>
              <Item item={item} isToggled={selectedItems.includes(item.id)} isToggeable={true} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={globalStyle.centered}
      />
    </View>
  );
}
