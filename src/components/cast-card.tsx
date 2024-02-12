import { Image } from "react-native";

import { image185 } from "@/api/movies";

interface CastCardProps {
  uri: string;
}

export function CastCard({ uri }: CastCardProps) {
  return <Image source={{ uri: image185(uri) }} style={{ height: 80, width: 80 }} className="h-14 w-14 bg-zinc-800 rounded-xl" />;
}
