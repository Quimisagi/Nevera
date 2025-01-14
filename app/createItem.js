import React from 'react';
import { useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Modal from "react-native-modal";
import globalStyle from '../styles/globalStyle';
import { useGlobal } from '../utils/globalProvider';
import {getDayNumber} from '../utils/dateManager';
import uuid from 'uuid-random';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import iconPaths from '../data/iconPaths';
import ItemModal from './components/itemModal';


export default function CreateItem() {
  const { setItems } = useGlobal(); 
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [fridgeTime, setFridgeTime] = useState(0);
  const [freezerTime, setFreezerTime] = useState(0);
  const [basketTime, setBasketTime] = useState(0);
  const [addedDate, setAddedDate] = useState(new Date());

  const [isModalVisible, setIsModalVisible] = useState(false);  

  const handleCreateItem = () => {
    const newItem = { name, icon, fridgeTime, freezerTime, basketTime, addedDate };
    setItems((prevItems) => [...prevItems, newItem]);
    onClose(); 
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setIcon('');
    setFridgeTime(0);
    setFreezerTime(0);
    setBasketTime(0);
    setAddedDate(getDayNumber());
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: addedDate,
      onChange: onChange,
      mode: 'date',
    });
  };

  return (
    <View>
      <View style={globalStyle.row}>
        <TouchableOpacity style={{flex : 1 }} onPress={() => setIsModalVisible(true)}>
          <Image source={iconPaths['pie']} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <View style={{flex: 3}}>
          <Text>Item Name</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Enter item name"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>
      <Text style={[globalStyle.h4, {marginTop:20}]}>Added Date</Text>
      <TouchableOpacity
        style={globalStyle.input}
        onPress={() => showDatepicker()}
      >
        <Text>{addedDate.toDateString()}</Text>
      </TouchableOpacity>
      <Text style={[ globalStyle.h4, {marginTop:20} ]}>Storage Duration</Text>

      <View style={[globalStyle.row, globalStyle.element, { marginTop: 20 }]}>
        <View style={{ flex: 1 }}>
          <MaterialCommunityIcons
            name="fridge"
            size={24}
            color="black"
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
            color="black"
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
            color="black"
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
      <TouchableOpacity title="Create Item" onPress={handleCreateItem} />
      <ItemModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} setSelectedIcon={setIcon} />
    </View>
);
}
