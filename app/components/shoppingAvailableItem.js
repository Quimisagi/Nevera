import React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import globalStyle from '../../styles/globalStyle';
import { CheckBox } from 'react-native-elements';

export default function ShoppingAvailableItem( { item, onChecked } ) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChecked(id) {
    setIsChecked(!isChecked);
    onChecked(id);
  }
  return (
    <View>
      { item !== undefined && ( 
        <View style={[globalStyle.row, { alignItems: 'center' }]}>
          <CheckBox
            checked={isChecked}
            onPress={() => handleChecked(item.id)}
          />
          <TouchableOpacity style={[globalStyle.row, { alignItems: 'center' }]} onPress={() => handleChecked(item.id)}>
            <Image
              source={item.icon}
              style={[globalStyle.element, { width: 30, height: 30, marginRight: 15 }, isChecked ? { opacity: 0.5 } : null]}
            />
            <Text style={[ globalStyle.baseText, isChecked ? styles.selected : null ]}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selected: {
    textDecorationLine: 'line-through',
    color: '#ADADAD',
  },
});

