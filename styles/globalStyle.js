import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';


Font.loadAsync({
  'PlusJakarta': require('../assets/fonts/PlusJakartaSans.ttf'),
  'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
});

const globalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 25,
  },
  secondaryContainer: {
    marginTop: 50,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  element: {
    margin: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },

  row: {
    flexDirection: 'row',
  },
  h1: {
    fontSize: 24,
    fontFamily: 'Poppins',
    marginTop: 15,
  },
  h2: {
    fontSize: 18,
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
  minorText: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
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
    maxHeight: '95%',
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
  button: {
    backgroundColor: '#11D054',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default globalStyle;
