import { Image, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";

import { TrendingMovieProps } from "@/types/trending-movies";
import { image500 } from "@/api/movies";

interface TrendingMovieCardProps {
  data: TrendingMovieProps;
  height: number;
  width: number;
}

export function TrendingMovieCard({ data, width, height }: TrendingMovieCardProps) {
  function handleClick() {
    router.push(`/movie/${data.id}`);
  }

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image source={{ uri: image500(data.poster_path) }} style={{ width, height }} className="bg-zinc-800 rounded-xl" />
    </TouchableWithoutFeedback>
  );
}
