import React from 'react';
import { useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Modal from "react-native-modal";
import globalStyle from '../../styles/globalStyle';
import iconPaths from '../../data/iconPaths';


export default function IconModal({ isVisible, onClose }) {
  const [icon, setIcon] = useState('apple');
  const [filteredIcons, setFilteredIcons] = useState(Object.entries(iconPaths)); // Initial state with all icons

  // Filter icons based on input
  const handleSearch = (text) => {
    setIcon(text);
    if (text) {
      const newFilteredIcons = Object.entries(iconPaths).filter(([name, path]) =>
        name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredIcons(newFilteredIcons);
    } else {
      setFilteredIcons(Object.entries(iconPaths));
    }
  };

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={globalStyle.modal}>
          <View style={{flex : 1, maxHeight: '95%'}}>
            <Text style={[globalStyle.h2, { marginTop: 20 }]}>Choose an Icon</Text>
            <TextInput
              placeholder="Search icons..."
              value={icon}
              onChangeText={handleSearch}
              style={[globalStyle.input, { marginBottom: 22.5 }]}
            />
            <View style={{ maxHeight: '90%' }}>
              <FlatList
                data={filteredIcons} // Use filtered icons
                numColumns={5}
                renderItem={({ item }) => {
                  const [name, path] = item; // Destructure name and path
                  return (
                    <TouchableOpacity onPress={() => setIcon(path)} style={{margin:2}}>
                      {icon === path ? 
                        <Image source={path} style={{ width: 50, height: 50, borderWidth: 3, borderColor: '#11D054', borderRadius: 10 }} /> :
                        <Image source={path} style={{ width: 50, height: 50 }} />
                      }
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(_, index) => index.toString()} // Use index as key
                contentContainerStyle={globalStyle.centered}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
