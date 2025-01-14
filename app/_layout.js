import { Stack } from "expo-router";
import { GlobalProvider } from '../utils/globalProvider';

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen 
          name="pickItems"
          options={{ headerTitle: 'Add Items',
          }}
        />
      </Stack>
    </GlobalProvider>
  )
}
