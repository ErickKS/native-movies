import { FlatList, Text, View } from "react-native";
import { CastCard } from "./cast-card";

import { MovieCastProps } from "@/types/movie-cast";

interface CastProps {
  cast: MovieCastProps[];
}

export function Cast({ cast }: CastProps) {
  return (
    <View className="mt-6 mb-8">
      <Text className="mx-5 mb-4 text-xl text-white font-medium">Top Cast</Text>

      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (item.profile_path ? <CastCard uri={item.profile_path} /> : null)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
    </View>
  );
}
