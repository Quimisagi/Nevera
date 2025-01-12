import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';


Font.loadAsync({
  'PlusJakarta': require('../assets/fonts/PlusJakartaSans.ttf'),
  'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
});

const globalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 17.5,
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
  baseText: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 15,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10, 
    padding: 30,
  },

  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 40, 
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default globalStyle;
