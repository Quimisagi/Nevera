import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Link } from 'expo-router';
import globalStyle from '../../styles/globalStyle';
import { useGlobal } from '../../utils/globalProvider';

export default function Storage() {
  const { fridge, freezer, basket } = useGlobal();
  return (
    <View>
      <Text style={globalStyle.h2}>Fridge</Text>
      <FlatList
        data={fridge}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
        keyExtractor={(item) => item.toString()}
      />
      <Text style={globalStyle.h2}>Freezer</Text>
      <FlatList
        data={freezer}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
        keyExtractor={(item) => item.toString()}
      />
      <Text style={globalStyle.h2}>Basket</Text>
      <FlatList
        data={basket}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

