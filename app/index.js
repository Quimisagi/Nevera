import { Text, View } from "react-native";
import { useNavigation, router } from "expo-router";
import { useEffect } from "react";
import { useRootNavigationState, Redirect } from 'expo-router';
import 'react-native-get-random-values';
import { defaultItems } from '../data/items_list';
import { useGlobal } from '../utils/globalProvider';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

export default function Index() {
  const navigation = useNavigation();
  const { items, setItems, shoppingListAddedItems, setShoppingListAddedItems, fridge, setFridge, freezer, setFreezer, basket, setBasket } = useGlobal();
  
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    
    async function loadData() {
      // Load items
      let resultItems = await MMKV.getStringAsync('items');
      if (resultItems) {
        setItems(JSON.parse(resultItems));
      } else {
        setItems(defaultItems);
      }
      
      // Load shopping list
      let resultShoppingList = await MMKV.getStringAsync('shoppingList');
      if (resultShoppingList) {
        setShoppingListAddedItems(JSON.parse(resultShoppingList));
      }
      
      // Load fridge
      let resultFridge = await MMKV.getStringAsync('fridge');
      if (resultFridge) {
        setFridge(JSON.parse(resultFridge));
      }
      
      // Load freezer
      let resultFreezer = await MMKV.getStringAsync('freezer');
      if (resultFreezer) {
        setFreezer(JSON.parse(resultFreezer));
      }
      
      // Load basket
      let resultBasket = await MMKV.getStringAsync('basket');
      if (resultBasket) {
        setBasket(JSON.parse(resultBasket));
      }
    }
    
    loadData();
  }, [navigation]);
  
  return (
    <Redirect href={'/storage'} />
  );
}
