import React from 'react';
import { useState, useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import globalStyle from '../../styles/globalStyle';
import { FlatList } from 'react-native-gesture-handler';
import Item from './item';
import { items_list, getItems } from '../../data/items_list';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';

export default function StoreItemsModal({ isVisible, onClose, selectedItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems(selectedItems));
  }
    , [selectedItems]);

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={globalStyle.modal}>
          <View style={globalStyle.centered}>
            <FlatList
              data={items}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View style={{transform: [{ scale: 0.8 }], margin: -13}}>
                  <Item item={item} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={[globalStyle.row, globalStyle.element, {marginTop: 10}]}>
            <TouchableOpacity style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="fridge" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to fridge</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Fontisto name="snowflake" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to freezer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex : 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="basket" size={24} color="black" />
              <Text style={globalStyle.h4}>Send to basket</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

