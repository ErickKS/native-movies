import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";

import { TrendingMovieCard } from "./trending-movie-card";

import { TrendingMovieProps } from "@/types/trending-movies";

interface TrendingMoviesProps {
  data: TrendingMovieProps[];
}

const { width, height } = Dimensions.get("window");

export function TrendingMovies({ data }: TrendingMoviesProps) {
  return (
    <View className="mb-8">
      <Carousel
        data={data}
        renderItem={({ item }) => <TrendingMovieCard data={item} height={height * 0.4} width={width * 0.6} />}
        firstItem={1}
        inactiveSlideOpacity={0.5}
        itemWidth={width * 0.6}
        sliderWidth={width}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
