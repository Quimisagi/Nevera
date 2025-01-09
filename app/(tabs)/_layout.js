import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default () => {
  return (
    <Tabs
      screenOptions={{
        showLabel: false,
      }}
    >
      <Tabs.Screen 
        name="storage" 
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              style={styles.button}
              name="house"
              size={24}
              color={focused ? '#333333' : '#89A1A9'}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="shoppingList" 
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              style={styles.button}
              name="wallet"
              size={24}
              color={focused ? '#333333' : '#89A1A9'}
            />
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
