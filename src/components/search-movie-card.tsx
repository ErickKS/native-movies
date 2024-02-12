import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { ListMovieCard } from "./list-movie-card";
import { MoviesProps } from "@/types/movies";

interface SearchMovieCardProps {
  data: MoviesProps;
}

const { width, height } = Dimensions.get("window");

export function SearchMovieCard({ data }: SearchMovieCardProps) {
  return (
    <TouchableOpacity className="pb-5">
      <ListMovieCard id={data.id.toString()} poster_path={data.poster_path} height={height * 0.3} width={width * 0.42} />

      <Text className="mt-2 text-sm text-zinc-400 font-medium">
        {data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title}
      </Text>
    </TouchableOpacity>
  );
}
