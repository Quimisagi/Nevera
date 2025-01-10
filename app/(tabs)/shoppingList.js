import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Item from '../components/item';
import ShoppingListItem from '../components/shoppingListItem'; 
import items from '../../data/items_list'; 
import { Link } from 'expo-router';
import { router } from "expo-router";
import { useGlobal } from '../../utils/globalProvider';

export default function ShoppingList() {
  const { shoppingListSelectedItems } = useGlobal();
  return (
    <View style={globalStyle.mainContainer}>
      <TouchableOpacity onPress={() =>router.push({ pathname:'/itemsList' })}>
        <Text>Pick Items</Text>
      </TouchableOpacity>
      {shoppingListSelectedItems.map((i, index) => (
        <ShoppingListItem key={index} item={items[i]} />
      ))}
    </View>
  );
}

