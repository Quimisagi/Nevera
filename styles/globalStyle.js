import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';


Font.loadAsync({
  'PlusJakarta': require('../assets/fonts/PlusJakartaSans.ttf'),
  'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
});

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'PlusJakarta',
  },
  h1: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20,
    fontFamily: 'Poppins',
  },
});

export default globalStyle;
