import { Text, View } from "react-native";
import { useNavigation, router } from "expo-router";
import { useEffect } from "react";
import { useRootNavigationState, Redirect } from 'expo-router';
import 'react-native-get-random-values';
import { defaultItems } from '../data/items_list';
import { useGlobal } from '../utils/globalProvider';
import * as SecureStore from 'expo-secure-store';


export default function Index() {
  const navigation = useNavigation();
  const { items, setItems, shoppingListAddedItems, setShoppingListAddedItems, fridge, setFridge, freezer, setFreezer, basket, setBasket } = useGlobal();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    async function loadData() {
      let resultItems = await SecureStore.getItemAsync('items');
      if (items) {
        setItems(JSON.parse(resultItems));
      } else {
        setItems(defaultItems);
      }
      let resultShoppingList = await SecureStore.getItemAsync('shoppingList');
      if (resultShoppingList) {
        setShoppingListAddedItems(JSON.parse(resultShoppingList));
      }
      let resultFridge = await SecureStore.getItemAsync('fridge');
      if (resultFridge) {
        setFridge(JSON.parse(resultFridge));
      }
      let resultFreezer = await SecureStore.getItemAsync('freezer');
      if (resultFreezer) {
        setFreezer(JSON.parse(resultFreezer));
      }
      let resultBasket = await SecureStore.getItemAsync('basket');
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
