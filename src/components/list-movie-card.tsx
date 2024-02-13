import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

import { image185 } from "@/api/movies";

interface ListMovieCardProps {
  id: string;
  poster_path: string;
  height: number;
  width: number;
}

export function ListMovieCard({ id, poster_path, width, height }: ListMovieCardProps) {
  function handlePress() {
    router.push(`/movie/${id}`);
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Image source={{ uri: image185(poster_path) }} style={{ width, height }} className="bg-zinc-800 rounded-md" />
    </TouchableOpacity>
  );
}
