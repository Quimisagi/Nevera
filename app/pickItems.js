import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import globalStyle from '../styles/globalStyle';
import { getItems } from '../data/items_list'; 
import Item from './components/item';
import { useNavigation, router, useLocalSearchParams } from 'expo-router';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobal } from '../utils/globalProvider';
import { getDayNumber } from '../utils/dateManager';
import uuid from 'uuid-random';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();


export default function PickItems() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [numColumns, setNumColumns] = useState(3);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const { shoppingListAddedItems, setShoppingListAddedItems, fridge, setFridge, freezer, setFreezer, basket, setBasket, items, setItems } = useGlobal();
  const { mode } = params;

  const toggleItem = (id) => {
    const newItems = selectedItems.includes(id)
      ? selectedItems.filter((temp) => temp !== id)
      : [...selectedItems, id];
    setSelectedItems(newItems);
  };

  const handleAddItems = async () => {
    if (mode === 'shoppingList') {
      await handleShoppingListAddition();
    } else {
      const tempItems = processAndPrepareItems(selectedItems, items);
      await handleModeSpecificUpdates(mode, tempItems);
      showToast(selectedItems.length, mode);
    }
    router.back();
  };
  const deleteItems = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    const updatedSelectedItems = selectedItems.filter((itemId) => itemId !== id);
    setItems(updatedItems);
    setSelectedItems(updatedSelectedItems);
    setShoppingListAddedItems(updatedSelectedItems);

    try {
      await MMKV.setStringAsync('items', JSON.stringify(updatedItems));
      await MMKV.setStringAsync('selectedItems', JSON.stringify(updatedSelectedItems));
      await MMKV.setStringAsync('shoppingList', JSON.stringify(updatedSelectedItems));
      Toast.show({
        type: 'success',
        text1: 'Items deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };

  // Handles shopping list-specific logic
  const handleShoppingListAddition = async () => {
    setShoppingListAddedItems(selectedItems);
    try {
      await MMKV.setStringAsync('shoppingList', JSON.stringify(selectedItems));
      Toast.show({
        type: 'success',
        text1: 'Items added to shopping list successfully',
      });
    } catch (error) {
      console.error('Error storing shopping list items:', error);
    }
  };

  // Prepares items and processes mode-specific updates
  const processAndPrepareItems = (selectedItems, items) => {
    console.log('Processing items:', selectedItems, items);
    return getItems(selectedItems, items).map((item) => ({
      ...item,
      id: uuid(),
      addedDate: getDayNumber(new Date()),
    }));
  };

  // Handles updates for fridge, freezer, and basket
  const handleModeSpecificUpdates = async (mode, tempItems) => {
    const updateStateAndStore = async (key, stateUpdater) => {
      stateUpdater((prev) => {
        const updated = [...prev, ...tempItems];
        MMKV.setStringAsync(key, JSON.stringify(updated))
          .catch((error) => console.error(`Error storing ${key} items:`, error));
        return updated;
      });
    };

    switch (mode) {
      case 'fridge':
        await updateStateAndStore('fridge', setFridge);
        break;
      case 'freezer':
        await updateStateAndStore('freezer', setFreezer);
        break;
      case 'basket':
        await updateStateAndStore('basket', setBasket);
        break;
      default:
        console.error(`Unknown mode: ${mode}`);
    }
  };

  // Handles toast notifications
  const showToast = (count, mode) => {
    Toast.show({
      type: 'success',
      text1: 'Items added successfully',
      text2: count === 1 ? `1 item added to ${mode}` : `${count} items added to ${mode}`,
    });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItems(id)
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (mode === 'shoppingList') {
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

  useEffect(() => {
    // Filter items based on search text
    if(items){
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );

    }
  }, [searchText, items]);

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
      headerTitle: selectedItems.length === 0 ? title : `${selectedItems.length} Items Selected`,
      headerRight: () => (
        <View style={globalStyle.row}>
          <TouchableOpacity
            style={{ margin: 15 }}
            onPress={handleAddItems}
          >
            <AntDesign name="check" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [selectedItems]);

  return (
    <View style={[globalStyle.mainContainer, globalStyle.secondaryContainer]}>
      <View style={[ globalStyle.row, globalStyle.centered]}>
        <Ionicons name="search" size={24} color="black" style={{flex: 1, marginLeft: 10}} />
        <TextInput
          style={[globalStyle.input, { marginBottom: 10, flex : 9 }]}
          placeholder="Search items..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <View>
            <TouchableOpacity
              style={[globalStyle.button, { marginBottom: 10 }]}
              onPress={() => router.push('/createItem')}
            >
              <View style={[globalStyle.row, globalStyle.element]}>
                <Ionicons name="create" size={24} color="white" />
                <Text style={[globalStyle.h4, { color: 'white', marginLeft: 10 }]}>
                  Create New Item
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        data={filteredItems}
        keyExtractor={(item, index) => item.id || index.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleItem(item.id)}
            activeOpacity={1}
            onLongPress={() => {confirmDelete(item.id)}}
          >
            <View style={[globalStyle.itemContainer, { transform: selectedItems.includes(item.id) ? [{ scale: 1 }] : [{ scale: 0.925 }] }]}>
              <Item item={item} isToggled={selectedItems.includes(item.id)} isToggeable={true} displayMode={'pickItems'} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={globalStyle.centered}
      />
    </View>
  );
}
