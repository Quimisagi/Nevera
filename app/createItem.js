import React from 'react';
import { useState, useEffect, useLayoutEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import globalStyle from '../styles/globalStyle';
import { useGlobal } from '../utils/globalProvider';
import {getDayNumber} from '../utils/dateManager';
import uuid from 'uuid-random';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import ItemModal from './components/itemModal';
import { useNavigation, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';


export default function CreateItem() {
  const { setItems } = useGlobal(); 
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(require("./kawaii-bread.png"));
  const [fridgeTime, setFridgeTime] = useState(0);
  const [freezerTime, setFreezerTime] = useState(0);
  const [basketTime, setBasketTime] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);  

  const navigation = useNavigation();

  const clearForm = () => {
    setName('');
    setIcon('');
    setFridgeTime(0);
    setFreezerTime(0);
    setBasketTime(0);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const createItem = async () => {
    const newItem = {
      id: uuid(),
      name,
      icon,
      fridgeTime,
      freezerTime,
      basketTime,
      // addedDate: getDayNumber(new Date()),
    };

    // Use a callback to update state and ensure the correct data is passed to SecureStore
    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      // Update SecureStore after calculating the new state
      SecureStore.setItemAsync('items', JSON.stringify(updatedItems))
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Item created successfully',
          });
          clearForm();
          router.back();
        })
        .catch((error) => console.error('Error storing items in SecureStore:', error));
      return updatedItems;
    });
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Item',
      headerRight: () => (
        <TouchableOpacity
          style={{
            margin: 15,
            ...( !name ? { opacity: 0.5 } : {} ) // Use spread operator for conditional styles
          }}
          disabled={!name}
          onPress={createItem}
        >
          <AntDesign name="check" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  } , [navigation, name, icon, fridgeTime, freezerTime, basketTime]);

  return (
    <View style={[ globalStyle.mainContainer, globalStyle.secondaryContainer ]}>
      <View style={[ globalStyle.row, {marginTop : 10} ]}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setIsModalVisible(true)}>
          <Image source={icon} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <View style={{flex: 3}}>
          <Text style={[globalStyle.h4, {marginLeft: 10} ]}>Item Name</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Enter item name"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>
      <Text style={[ globalStyle.h4, {marginTop:30} ]}>Storage Duration</Text>

      <View style={[globalStyle.row, globalStyle.element, { marginTop: 30 }]}>
        <View style={{ flex : 1}}>
          <MaterialCommunityIcons
            name="fridge"
            size={24}
            color="#033E63"
            style={{ textAlign: 'center' }}
          />
          <TextInput
            style={globalStyle.input}
            value={fridgeTime.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setFridgeTime(Number(text.replace(/[^0-9]/g, '')))}
          />
          <Text style={globalStyle.minorText}>Days</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Fontisto
            name="snowflake"
            size={24}
            color="#4BB1BE"
            style={{ textAlign: 'center' }}
          />
          <TextInput
            style={globalStyle.input}
            value={freezerTime.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setFreezerTime(Number(text.replace(/[^0-9]/g, '')))}
          />
          <Text style={globalStyle.minorText}>Days</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Ionicons
            name="basket"
            size={24}
            color="#F2A202"
            style={{ textAlign: 'center' }}
          />
          <TextInput
            style={globalStyle.input}
            value={basketTime.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setBasketTime(Number(text.replace(/[^0-9]/g, '')))}
          />
          <Text style={globalStyle.minorText}>Days</Text>
        </View>
      </View>
      <ItemModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} icon={icon} setIcon={setIcon}/>
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ABABAB',
    flex: 1,
    maxWidth: 75,
    marginRight: 15,
  },
});

