import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import ShoppingAvailableItem from '../components/shoppingAvailableItem'; 
import { getItems } from '../../data/items_list'; 
import { useNavigation, router } from "expo-router";
import { useGlobal } from '../../utils/globalProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import StoreItemsModal from '../components/storeItemsModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ShoppingList() {
  const navigation = useNavigation();
  const { shoppingListAddedItems, items } = useGlobal();

  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleItem = (newId) => {
    const newItems = selectedItems.includes(newId)
      ? selectedItems.filter((id) => id !== newId)
      : [...selectedItems, newId];
    setSelectedItems(newItems);
  };

  useEffect(() => {
    const temp = getItems(shoppingListAddedItems, items); 
    setShoppingListItems(temp);
  }, [navigation, shoppingListAddedItems, items]);
  //Remove the items in selectedItems that are not in shoppingListItems
  useEffect(() => {
    setSelectedItems(selectedItems.filter((id) => shoppingListItems.map((item) => item.id).includes(id)));
  } , [shoppingListItems]);

  return (
    <View style={globalStyle.mainContainer}> 
      <Text style={globalStyle.h1}>Shopping List</Text>
      {shoppingListAddedItems.length === 0 && (
        <View style={[ globalStyle.centered, { flex: 1 } ]}>
          <Text style={globalStyle.h2}>No items added</Text>
          <View style={globalStyle.row}>
            <Text style={globalStyle.minorText}>Press the </Text>
            <Ionicons name="add" size={18} color="gray" />
            <Text style={globalStyle.minorText}> button to add items</Text>
          </View>
        </View>
      )}
      <FlatList
        data={shoppingListItems}
        ListHeaderComponent={
          <TouchableOpacity onPress={() => router.push({ pathname: '/pickItems', params: { mode: 'shoppingList' } })}>
            <View style={{marginLeft: 11}}>
              <View style={[ globalStyle.row, {justifyContent: 'center'}]}>
                <Ionicons
                  name="add"
                  size={35}
                  color={'#16B671'}
                />
                <Text style={[globalStyle.h4, { color: '#16B671', alignContent: 'center', marginLeft: 3, marginTop: 5 }]}>Add Items</Text>
              </View>

            </View>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <ShoppingAvailableItem
            item={item}
            onChecked={toggleItem}
          />
        )}
        ListFooterComponent={
          <View style={{ height: 60 }} />
        }
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      <GestureHandlerRootView>
        <StoreItemsModal 
          isVisible={showModal} 
          onClose={() => setShowModal(false)}
          purchasedItemIds={selectedItems} 
        />
      </GestureHandlerRootView>

      {shoppingListItems.length > 0 && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
          onPress={() => setShowModal(true)}
          disabled={selectedItems.length === 0}
        >
          <LinearGradient
            colors={['#16B671', '#11D054']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 10,
              width: 200,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: selectedItems.length === 0 ? 0.35 : 1,
            }}
          >
            <Text style={[ globalStyle.h4, { color: '#FFF', fontWeight: 'bold' } ]}>
              Finish Shopping
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )
      }
    </View>
  );
}
