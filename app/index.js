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
  const { items, setItems } = useGlobal();

  useEffect(() => {
    navigation.setOptions({headerShown: false});
    async function loadData() {
      let result = await SecureStore.getItemAsync('items');
      if (result) {
        setItems(JSON.parse(result));
      } else {
        setItems(defaultItems);
      }
    }
    loadData();

  }, [navigation]);

  return (
    <Redirect href={'/storage'} />
  );
}
