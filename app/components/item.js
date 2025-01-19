import React from 'react';
import { useState, useEffect} from 'react';
import globalStyle from '../../styles/globalStyle';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome6, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { timeLeft } from '../../utils/dateManager';

export default function Item({ item, isToggled, isToggeable = false, displayMode, storageType}) {

  return (
    <View style={styles.container}>
      <View style={globalStyle.row}>
        <View style={{ flex: 3 }} />
        {isToggeable ? (
          <View style={[globalStyle.centered, styles.selectCircle, isToggled ? styles.selected : styles.unselected]}>
            {isToggled && <FontAwesome6 style={{ marginLeft: 0.5 }} name="check" size={15} color="white" />}
          </View>
        ) : null}
      </View>

      <Image source={item.icon} style={[globalStyle.element, { width: 50, height: 50, marginTop: isToggeable ? 20 : 10 }]} />

      <View style={[globalStyle.element, globalStyle.centered]}>
        <Text style={[globalStyle.h4]}>{item.name}</Text>

        {displayMode === 'pickItems' && (
          <View style={[ globalStyle.centered, {marginTop: 5} ]}>
            <View style={globalStyle.row}>
              <MaterialCommunityIcons name="fridge" size={15} color="#033E63" />
              <MaterialCommunityIcons name="snowflake" size={15} color="#4BB1BE" />
              <Ionicons name="basket" size={15} color="#F2A202" />
            </View>

            <View style={globalStyle.row}>
              <Text style={[styles.timeText, { color: '#033E63' }]}>{item.fridgeTime}d</Text>
              <Text style={[styles.timeText, { color: '#4BB1BE' }]}>{item.freezerTime}d</Text>
              <Text style={[styles.timeText, { color: '#F2A202' }]}>{item.basketTime}d</Text>
            </View>
          </View>
        )}

        {displayMode === 'storage' && (
          storageType === 'fridge' ? (
            <View style={globalStyle.row}>
              <Text style={styles.minorText}>Left:</Text>
              <Text style={[ styles.timeText, { color: timeLeft( item.fridgeTime, item.addedDate ) < 2 ? 'red' : 'black' } ]}>
              {timeLeft( item.fridgeTime, item.addedDate )}d</Text>
            </View>
          ) : storageType === 'freezer' ? (
            <View style={globalStyle.row}>
              <Text style={styles.minorText}>Left:</Text>
              <Text style={[ styles.timeText, { color: timeLeft( item.freezerTime, item.addedDate ) < 2 ? 'red' : 'black' } ]}>
              {timeLeft( item.freezerTime, item.addedDate )}d</Text>
            </View>
          ) : storageType === 'basket' ? (
            <View style={globalStyle.row}>
              <Text style={styles.minorText}>Left:</Text>
              <Text style={[ styles.timeText, { color: timeLeft( item.basketTime, item.addedDate ) < 2 ? 'red' : 'black' } ]}>
              {timeLeft( item.basketTime, item.addedDate )}d</Text>
            </View>
          ) : null
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 110,
    maxWidth: 110,
    maxHeight: 175,
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
  timeText: {
    fontSize: 12,
    margin: 3,
  },
  minorText: {
    fontSize: 12,
    color: '#ADADAD',
    margin: 3,
  },
});

