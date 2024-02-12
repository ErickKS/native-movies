import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { ListMovieCard } from "./list-movie-card";

import { MoviesProps } from "@/types/movies";

interface MoviesListProps {
  title: string;
  trigger?: boolean;
  data: MoviesProps[];
}

const { width, height } = Dimensions.get("window");

export function ListMovies({ title, trigger = true, data }: MoviesListProps) {
  return (
    <View>
      <View className="flex-row justify-between items-center mx-5 mb-4">
        <Text className="text-xl text-white font-medium">{title}</Text>

        {trigger && (
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-base text-red-600 font-regular">See all</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListMovieCard id={item.id.toString()} poster_path={item.poster_path} height={height * 0.22} width={width * 0.33} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        className="mb-6"
      />
    </View>
  );
}
