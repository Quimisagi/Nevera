import React from 'react';
import { useState, useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import globalStyle from '../../styles/globalStyle';
import { FlatList } from 'react-native-gesture-handler';
import Item from './item';
import { items_list, getItems } from '../../data/items_list';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { useGlobal } from '../../utils/globalProvider';
import {getDayNumber} from '../../utils/dateManager';
import uuid from 'uuid-random';
import Toast from 'react-native-toast-message';


export default function StoreItemsModal({ isVisible, onClose, purchasedItemIds, removeSelectedItems }) {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const { fridge, setFridge, freezer, setFreezer, basket, setBasket, shoppingListAddedItems, setShoppingListAddedItems, items, SetItems } = useGlobal();
  
  const toggleItem = (id) => {
    const newItems = selectedItemIds.includes(id)
      ? selectedItemIds.filter((temp) => temp !== id)
      : [...selectedItemIds, id];
    setSelectedItemIds(newItems);
  };

  const selectAll = () => {
    setSelectedItemIds(purchasedItems.map((item) => item.id));
  }

  const sendTo = (destination) => {
    let tempItems = getItems(selectedItemIds, items);
    tempItems = tempItems.map((item) => {
      return {
        ...item,
        id: uuid(),
        date: getDayNumber(),
      };
    });
    switch (destination) {
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
    const newItems = shoppingListAddedItems.filter((id) => !selectedItemIds.includes(id));
    Toast.show({
      type: 'success',
      text1: 'Items stored succesufly',
      text2: selectedItemIds.length === 1 ? '1 item stored in ' + destination : selectedItemIds.length + ' items stored in ' + destination,
    });

    setSelectedItemIds([]);
    setShoppingListAddedItems(newItems.map((item) => item));
  }

  useEffect(() => {
    setPurchasedItems(getItems(purchasedItemIds, items));
  }
    , [purchasedItemIds]);

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={globalStyle.modal}>
          <View style={globalStyle.centered}>
            {purchasedItems.length === 0 ? (
              <View style={[globalStyle.centered]}>
                <Text style={globalStyle.h2}>All items stored!</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={[globalStyle.h4, {color: '#16B671'}]}>Close</Text>
                </TouchableOpacity>
              </View>
            ) : selectedItemIds.length !== purchasedItems.length ? (
              <View style={[globalStyle.row, {justifyContent: 'flex-end'}]}>
                <TouchableOpacity onPress={selectAll}>
                  <Text style={[globalStyle.h4, {color: '#16B671', marginBottom: 20}]}>Select all</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[globalStyle.row, {justifyContent: 'flex-end'}]}>
                <TouchableOpacity onPress={() => setSelectedItemIds([])}>
                  <Text style={[globalStyle.h4, {color: '#16B671', marginBottom: 20}]}>Unselect all</Text>
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={purchasedItems}
              numColumns={3}
              renderItem={({ item, index }) => (
                <TouchableOpacity 
                  onPress={()=> toggleItem(item.id)} 
                  style={{transform: selectedItemIds.includes(item.id) ? [{ scale: 0.85 }] : [{scale: 0.75}], margin: -13}}
                  activeOpacity={1}
                >
                  <Item item={item} isToggled={selectedItemIds.includes(item.id)} isToggeable={true} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={[globalStyle.row, globalStyle.element, {marginTop: 10}]}>
            <TouchableOpacity 
              style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center', opacity: selectedItemIds.length === 0 ? 0.5 : 1 }}
              onPress={() => sendTo('fridge')}
              disabled={selectedItemIds.length === 0}
            >
              <MaterialCommunityIcons name="fridge" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to fridge</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center', opacity: selectedItemIds.length === 0 ? 0.5 : 1 }}
              onPress={() => sendTo('freezer')}
              disabled={selectedItemIds.length === 0}
            >
              <Fontisto name="snowflake" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to freezer</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center', opacity: selectedItemIds.length === 0 ? 0.5 : 1 }}
              onPress={() => sendTo('basket')}
              disabled={selectedItemIds.length === 0}
            >
              <Ionicons name="basket" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to basket</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

