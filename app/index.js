import { Text, View } from "react-native";
import { useNavigation, router } from "expo-router";
import { useEffect } from "react";
import { useRootNavigationState, Redirect } from 'expo-router';

export default function Index() {
  const navigationState = useRootNavigationState();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  return (
    <Redirect href={'/storage'} />
  );
}
