import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { router, useNavigation } from 'expo-router';
import globalStyle from '../../styles/globalStyle';
import { useGlobal } from '../../utils/globalProvider';
import Item from '../components/item';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';


export default function Storage() {
  const navigation = useNavigation();

  const { fridge, freezer, basket } = useGlobal();
  return (
    <ScrollView>
      <View style={globalStyle.mainContainer}>
        <View style={globalStyle.row}>
          <MaterialCommunityIcons name="fridge" size={24} color="black" />
          <Text style={[ globalStyle.h2, {marginLeft: 10} ]}>Fridge</Text>
          <TouchableOpacity onPress={()=> router.push({pathname: '/pickItems', params: {mode: 'fridge'}})}>
            <Text style={[ globalStyle.h4, {marginLeft: 10, color: '#34D585'}]}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={fridge}
          renderItem={({ item }) => (
            <Item item={item} />
          )}
          keyExtractor={(item) => item.toString()}
        />
        <View style={globalStyle.row}>
          <Fontisto name="snowflake" size={24} color="black" />
          <Text style={[ globalStyle.h2, {marginLeft: 10} ]}>Freezer</Text>
          <TouchableOpacity onPress={()=> router.push({pathname: '/pickItems', params: {mode: 'freezer'}})}>
            <Text style={[ globalStyle.h4, {marginLeft: 10, color: '#34D585'}]}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={freezer}
          key = {item => item.instanceId} 
          renderItem={({ item }) => (
            <Item item={item} />
          )}
          keyExtractor={(item) => item.instanceId.toString()}
        />
        <View style={globalStyle.row}>
          <Ionicons name="basket" size={24} color="black" />
          <Text style={[ globalStyle.h2, {marginLeft: 10} ]}>Basket</Text>
          <TouchableOpacity onPress={()=> router.push({pathname: '/pickItems', params: {mode: 'basket'}})}>
            <Text style={[ globalStyle.h4, {marginLeft: 10, color: '#34D585'}]}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={basket}
          renderItem={({ item }) => (
            <Item item={item} />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </ScrollView>
  );
}

