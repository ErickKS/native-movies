import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";

import { Loading } from "@/components/loading";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="search"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
