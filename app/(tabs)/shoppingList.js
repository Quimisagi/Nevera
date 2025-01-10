import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Item from '../components/item';
import { Link } from 'expo-router';
import { router } from "expo-router";

export default function ShoppingList() {
  return (
    <View>
      <TouchableOpacity onPress={() =>router.push({ pathname:'/itemsList' })}>
        <Text>Welcome to ShoppingList</Text>
      </TouchableOpacity>
    </View>
  );
}

