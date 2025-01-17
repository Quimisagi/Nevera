import { Stack } from "expo-router";
import { GlobalProvider } from "../utils/globalProvider";
import { StatusBar } from "react-native";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <GlobalProvider>
      <StatusBar 
        backgroundColor="transparent" 
        translucent 
        barStyle="dark-content" // Change to "light-content" for light text
      />
      <Stack
        screenOptions={{
          headerTransparent: true, // For transparent headers
          headerTitleStyle: {
            fontFamily: "Poppins",
            fontSize: 20,
          },
        }}
      >
        {/* Override specific screens if needed */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pickItems"
          options={{
            headerShown: true, // Show the header for this screen
            headerTitle: "Add Items",
          }}
        />
      </Stack>
      <Toast/>
    </GlobalProvider>
  );
}
