import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

export function Header() {
  return (
    <View className="flex-row justify-between items-center py-5 mx-5 mb-6">
      <View className="flex-row">
        <Text className="text-2xl text-red-600 font-semibold tracking-widest">Movie.</Text>
        <Text className="text-2xl text-white font-semibold tracking-widest">Flix</Text>
      </View>

      <Link href={"/search"}>
        <Feather name="search" size={26} color={colors.white} />
      </Link>
    </View>
  );
}
