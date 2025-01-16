import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Item from '../components/item';
import ShoppingAvailableItem from '../components/shoppingAvailableItem'; 
import { getItems } from '../../data/items_list'; 
import { Link } from 'expo-router';
import { useNavigation, router } from "expo-router";
import { useGlobal } from '../../utils/globalProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import StoreItemsModal from '../components/storeItemsModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function ShoppingList() {
  const navigation = useNavigation();
  const { shoppingListAddedItems, items } = useGlobal();

  const [availableItems, setAvailableItems] = useState();
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
  setAvailableItems(temp);
}, [navigation, shoppingListAddedItems, items]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        shoppingListAddedItems.length > 0 &&
        <TouchableOpacity
          style={{ margin: 15, padding: 5, opacity: selectedItems.length == 0 ? 0.35 : 1 }}
          onPress={() => setShowModal(true)}
          disabled={selectedItems.length == 0}
        >
          <View style={[ globalStyle.row, globalStyle.centered ]}>
            <Ionicons name="bag-check-outline" size={24} color="black" />
            <Text style={[ globalStyle.h4, {marginLeft: 7.5} ]}>Finish</Text>
          </View>
        </TouchableOpacity>
      ),

    });
  }, [navigation, shoppingListAddedItems, selectedItems]);


  return (
    <View style={globalStyle.mainContainer}> 
      <Text style={globalStyle.h1}>Shopping List</Text>
      {shoppingListAddedItems.length == 0 && (
        <View style={[ globalStyle.centered, { flex: 1 } ]}>
          <Text style={globalStyle.h2}>No items added</Text>
          <View style={globalStyle.row}>
            <Text style={globalStyle.minorText}>Press the </Text>
            <Ionicons name="add" size={18} color="gray" />
            <Text style={globalStyle.minorText}> button to add items</Text>
          </View>
        </View>
      )
      }
      <FlatList
        data={availableItems}
        renderItem={({ item }) => (
          <ShoppingAvailableItem
            item={item}
            onChecked={toggleItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        contentContainerStyle={{ paddingVertical: 10 }} // Optional styling
      />

      <GestureHandlerRootView>
        <StoreItemsModal 
          isVisible={showModal} 
          onClose={() => setShowModal(false)}
          purchasedItemIds={selectedItems} 
        />
      </GestureHandlerRootView>

      <TouchableOpacity onPress={() =>router.push({ pathname:'/pickItems', params: {mode: 'shoppingList'} })}>
        <LinearGradient
          colors={['#16B671', '#11D054']} // Gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{   
            borderRadius: 50,
            width: 65,
            height: 65,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 1.5,
            position: 'absolute',
            right: 20,
            bottom: 10,

          }}
        >
          <Ionicons
            name="add"
            size={50}
            color={'#FFF'}
          />
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
}

