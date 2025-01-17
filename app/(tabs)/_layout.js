import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

export default () => {
  return (
    <Tabs
      screenOptions={{
        showLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="storage" 
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="house"
              size={24}
              color={focused ? '#14A365' : '#89A1A9'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#14A365' : '#89A1A9', fontSize: 10 }}>Storage</Text>
          ),
        }}
      />
      <Tabs.Screen 
        name="shoppingList" 
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="list-check"
              size={24}
              color={focused ? '#14A365' : '#89A1A9'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#14A365' : '#89A1A9', fontSize: 10 }}>Shopping List</Text>
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
