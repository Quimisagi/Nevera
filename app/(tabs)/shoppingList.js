import React from 'react';
import { Text, View } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import { Link } from 'expo-router';

export default function ShoppingList() {
  return (
    <View>
      <Text style={globalStyle.h1}>ShoppingList</Text>
      <Text>Welcome to ShoppingList</Text>
    </View>
  );
}

