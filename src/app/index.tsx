import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "@/api/movies";
import { TrendingMovieProps } from "@/types/trending-movies";
import { MoviesProps } from "@/types/movies";

import { Header } from "@/components/header";
import { TrendingMovies } from "@/components/trending-movies";
import { ListMovies } from "@/components/list-movies";

export default function Home() {
  const [trending, setTrending] = useState<TrendingMovieProps[]>([]);
  const [upcoming, setUpcoming] = useState<MoviesProps[]>([]);
  const [topRated, setTopRated] = useState<MoviesProps[]>([]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMoviesMovies();
  }, []);

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();
    if (data) setTrending(data.results);
  }

  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies();
    if (data) setUpcoming(data.results);
  }

  async function getTopRatedMoviesMovies() {
    const data = await fetchTopRatedMovies();
    if (data) setTopRated(data.results);
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <TrendingMovies data={trending} />

        <ListMovies title="Upcoming" data={upcoming} />

        <ListMovies title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  );
}
