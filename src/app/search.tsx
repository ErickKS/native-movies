import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Alert, Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";

import { SearchMovieCard } from "@/components/search-movie-card";

import colors from "tailwindcss/colors";
import { useState } from "react";
import { Loading } from "@/components/loading";
import { searchMovies } from "@/api/movies";
import { MoviesProps } from "@/types/movies";

export default function Search() {
  const router = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<MoviesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch() {
    if (searchValue.trim().length === 0) {
      return Alert.alert("Erro", "erro");
    }

    setIsLoading(true);

    const data = await searchMovies({
      query: searchValue,
      page: "1",
    });

    if (data) {
      setResults(data.results);
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
  }

  return (
    <View className="flex-1 mx-5">
      <View className="flex-row items-center mt-5">
        <TouchableOpacity
          onPress={() => router.goBack()}
          activeOpacity={0.7}
          className="justify-center items-center h-12 w-12 bg-zinc-800 rounded-xl"
        >
          <Feather name="chevron-left" size={28} color={colors.white} />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center py-3 px-4 ml-4 bg-zinc-800 rounded-xl">
          <TextInput
            onChangeText={(text) => setSearchValue(text)}
            placeholder="Search movie"
            placeholderTextColor={colors.zinc[400]}
            blurOnSubmit={true}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            className="flex-1 text-white font-medium"
          />

          <TouchableOpacity activeOpacity={1} onPress={handleSearch}>
            <Feather name="search" size={26} color={colors.zinc[400]} />
          </TouchableOpacity>
        </View>
      </View>

      {results.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
          <View className="flex-row flex-wrap justify-between">
            {results.map((result) => (
              <SearchMovieCard key={result.id} data={result} />
            ))}
          </View>
        </ScrollView>
      ) : isLoading ? (
        <Loading />
      ) : (
        <View className="flex-1 items-center mt-32">
          <Image source={require("@/assets/search-movie.png")} className="h-[250px] w-[262px]" />
        </View>
      )}
    </View>
  );
}
