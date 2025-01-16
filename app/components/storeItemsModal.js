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


export default function StoreItemsModal({ isVisible, onClose, purchasedItemIds }) {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { fridge, setFridge, freezer, setFreezer, basket, setBasket, setShoppingListAddedItems, items, SetItems } = useGlobal();
  
  const toggleItem = (id) => {
    const newItems = selectedItems.includes(id)
      ? selectedItems.filter((temp) => temp !== id)
      : [...selectedItems, id];
    setSelectedItems(newItems);
  };

  const sendTo = (destination) => {
    let tempItems = getItems(selectedItems, items);
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
    const newPurchasedItems = purchasedItems.filter((item) => !selectedItems.includes(item.id));
    setSelectedItems([]);
    setPurchasedItems(newPurchasedItems);
    setShoppingListAddedItems(newPurchasedItems.map((item) => item.id));
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
            <FlatList
              data={purchasedItems}
              numColumns={3}
              renderItem={({ item, index }) => (
                <TouchableOpacity 
                  onPress={()=> toggleItem(item.id)} 
                  style={{transform: selectedItems.includes(item.id) ? [{ scale: 0.85 }] : [{scale: 0.75}], margin: -13}}
                  activeOpacity={1}
                >
                  <Item item={item} isToggled={selectedItems.includes(item.id)} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={[globalStyle.row, globalStyle.element, {marginTop: 10}]}>
            <TouchableOpacity 
              style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => sendTo('fridge')}
            >
              <MaterialCommunityIcons name="fridge" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to fridge</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => sendTo('freezer')}
            >
              <Fontisto name="snowflake" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to freezer</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => sendTo('basket')}
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

