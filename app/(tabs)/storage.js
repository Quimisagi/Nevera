import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Link } from 'expo-router';
import globalStyle from '../../styles/globalStyle';
import { useGlobal } from '../../utils/globalProvider';
import Item from '../components/item';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';


export default function Storage() {

  const { fridge, freezer, basket } = useGlobal();
  return (
    <View style={globalStyle.mainContainer}>
      <View style={globalStyle.row}>
        <MaterialCommunityIcons name="fridge" size={24} color="black" />
        <Text style={[ globalStyle.h2, {marginLeft: 10} ]}>Fridge</Text>
      </View>
      <FlatList
        data={fridge}
        horizontal={true}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        keyExtractor={(item) => item.toString()}
      />
      <View style={globalStyle.row}>
        <Fontisto name="snowflake" size={24} color="black" />
        <Text style={[ globalStyle.h2, {marginLeft: 10} ]}>Freezer</Text>
      </View>
      <FlatList
        data={freezer}
        horizontal={true}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        keyExtractor={(item) => item.toString()}
      />
      <View style={globalStyle.row}>
        <Ionicons name="basket" size={24} color="black" />
        <Text style={[ globalStyle.h2, {marginLeft: 10} ]}>Basket</Text>
      </View>
      <FlatList
        data={basket}
        horizontal={true}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

