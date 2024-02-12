import { Link } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

import { image185 } from "@/api/movies";

interface ListMovieCardProps {
  id: string;
  poster_path: string;
  height: number;
  width: number;
}

export function ListMovieCard({ id, poster_path, width, height }: ListMovieCardProps) {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <Image source={{ uri: image185(poster_path) }} style={{ width, height }} className="bg-zinc-800 rounded-md" />
      </TouchableOpacity>
    </Link>
  );
}
