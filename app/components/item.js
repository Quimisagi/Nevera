import React from 'react';
import { useState, useEffect} from 'react';
import globalStyle from '../../styles/globalStyle';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome6 } from '@expo/vector-icons';



export default function Item({ item, isToggled }) {
  return (
    <View style={styles.container}>
      <View style={globalStyle.row}>
        <View style={{ flex: 3 }}/>
        <View style={[globalStyle.centered, styles.selectCircle, isToggled ? styles.selected : styles.unselected]}>
          {isToggled && <FontAwesome6 style={{marginLeft: 0.5}} name="check" size={15} color="white" />}
        </View>
      </View>
      <Image source={item.icon} style={[ globalStyle.element, { width: 50, height: 50, marginTop: 20 } ]} />
      <View style={[ globalStyle.element, globalStyle.centered ]}>
        <Text style={globalStyle.h4}>{item.name}</Text>
        <Text>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6.5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectCircle: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
  },
  unselected: {
    backgroundColor: '#ADADAD',
        borderRadius: 10,

  },
  selected: {
    backgroundColor: '#34D585',
        borderRadius: 10,

  },
});

