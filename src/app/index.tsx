import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { fetchMovies } from "@/api/movies";
import { TrendingMovieProps } from "@/types/trending-movies";
import { MoviesProps } from "@/types/movies";

import { Header } from "@/components/header";
import { TrendingMovies } from "@/components/trending-movies";
import { ListMovies } from "@/components/list-movies";
import { Loading } from "@/components/loading";

export default function Home() {
  const [trending, setTrending] = useState<TrendingMovieProps[]>([]);
  const [upcoming, setUpcoming] = useState<MoviesProps[]>([]);
  const [topRated, setTopRated] = useState<MoviesProps[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      const [trending, upcoming, topRated] = await Promise.all([
        fetchMovies("trending"),
        fetchMovies("upcoming"),
        fetchMovies("top-rated"),
      ]);

      if (trending && upcoming && topRated) {
        setTrending(trending.results);
        setUpcoming(upcoming.results);
        setTopRated(topRated.results);

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center items-center bg-neutral-900">
          <Loading />
        </View>
      ) : (
        <View className="flex-1 bg-neutral-900">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header />

            <TrendingMovies data={trending} />

            <ListMovies title="Upcoming" data={upcoming} />

            <ListMovies title="Top Rated" data={topRated} />
          </ScrollView>
        </View>
      )}
    </>
  );
}
