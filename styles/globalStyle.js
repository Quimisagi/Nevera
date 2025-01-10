import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';


Font.loadAsync({
  'PlusJakarta': require('../assets/fonts/PlusJakartaSans.ttf'),
  'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
});

const globalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 22.5,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  element: {
    margin: 2.5,
  },

  row: {
    flexDirection: 'row',
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
  h4: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans',
    fontWeight: 'normal'
  },
});

export default globalStyle;
