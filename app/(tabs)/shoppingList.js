import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Item from '../components/item';
import ShoppingListItem from '../components/shoppingListItem'; 
import { items, getItems } from '../../data/items_list'; 
import { Link } from 'expo-router';
import { useNavigation, router } from "expo-router";
import { useGlobal } from '../../utils/globalProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import StoreItemsModal from '../components/storeItemsModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function ShoppingList() {
  const navigation = useNavigation();
  const { shoppingListAddedItems } = useGlobal();

  const [addedItems, setAddedItems] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const renderShoppingListItem = ({ index }) => (
    <ShoppingListItem key={index.toString()} item={addedItems[index]} onChecked={(id) => toggleItem(id)} />
  );

  const toggleItem = (newId) => {
    const newItems = selectedItems.includes(newId)
      ? selectedItems.filter((id) => id !== newId)
      : [...selectedItems, newId];
    setSelectedItems(newItems);
  };

useEffect(() => {
  const temp = getItems(shoppingListAddedItems); 
  setAddedItems(temp);
}, [navigation, shoppingListAddedItems, items]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ margin: 15, padding: 5 }}
          onPress={() => setShowModal(true)}
        >
          <View style={[ globalStyle.row, globalStyle.centered ]}>
            <Ionicons name="bag-check-outline" size={24} color="black" />
            <Text style={[ globalStyle.h4, {marginLeft: 7.5} ]}>Finish</Text>
          </View>
        </TouchableOpacity>
      ),

    });
  }, [navigation, shoppingListAddedItems]);


  return (
    <View style={globalStyle.mainContainer}> 
      <Text style={globalStyle.h1}>Shopping List</Text>
      {shoppingListAddedItems.length == 0 && (
        <View style={[ globalStyle.centered, { flex: 1 } ]}>
          <Text style={globalStyle.h2}>No items selected</Text>
        </View>
      )
      }
      <FlatList
        data={shoppingListAddedItems}
        renderItem={renderShoppingListItem}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        contentContainerStyle={{ paddingVertical: 10 }} // Optional styling
      />

      <GestureHandlerRootView>
        <StoreItemsModal 
          isVisible={showModal} 
          onClose={() => setShowModal(false)}
          selectedItems={selectedItems} 
        />
      </GestureHandlerRootView>

      <TouchableOpacity onPress={() =>router.push({ pathname:'/itemsList' })}>
        <LinearGradient
          colors={['#B3F9CC', '#12E25B']} // Gradient colors
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
            name="add-circle-outline"
            size={50}
            color={'#FFF'}
          />
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
}

