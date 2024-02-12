import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "@/api/movies";
import { MovieDetailsProps } from "@/types/movie-details";
import { MovieCastProps } from "@/types/movie-cast";
import { MoviesProps } from "@/types/movies";

import { Cast } from "@/components/cast";
import { Loading } from "@/components/loading";

import colors from "tailwindcss/colors";
import { ListMovies } from "@/components/list-movies";

const { width, height } = Dimensions.get("window");

export default function MoviePage() {
  const { id } = useLocalSearchParams();
  const router = useNavigation();

  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
  const [cast, setCast] = useState<MovieCastProps[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MoviesProps[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMoviesDetails();
    getMoviesCredits();
    getSimilarMovies();
  }, []);

  async function getMoviesDetails() {
    const data = await fetchMovieDetails(id);

    if (data) {
      setLoading(false);
      setMovie(data);
    }
  }

  async function getMoviesCredits() {
    const data = await fetchMovieCredits(id);

    if (data) setCast(data.cast);
  }

  async function getSimilarMovies() {
    const data = await fetchSimilarMovies(id);

    if (data) setSimilarMovies(data.results);
  }

  function handleToggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  function handleToggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  function wordLimit(text: string | undefined) {
    if (!text) return;

    let words = text.split(" ");

    if (words.length > 32) {
      return words.slice(0, 32).join(" ") + "...";
    }

    return text;
  }

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Loading />
        </View>
      ) : (
        <ScrollView>
          <View className="absolute top-5 left-5 z-10 right-5 flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.goBack()}
              activeOpacity={0.7}
              className="justify-center items-center h-12 w-12 bg-zinc-800 rounded-xl"
            >
              <Feather name="chevron-left" size={28} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleToggleFavorite}
              activeOpacity={1}
              className="justify-center items-center h-12 w-12 bg-zinc-800 rounded-xl"
            >
              {isFavorite ? (
                <MaterialCommunityIcons name="cards-heart" size={28} color={colors.red[600]} />
              ) : (
                <MaterialCommunityIcons name="cards-heart-outline" size={28} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Image source={{ uri: image500(movie?.poster_path!) }} style={{ width, height: height * 0.55 }} className="bg-zinc-700" />

            <LinearGradient
              colors={["transparent", "rgba(23, 23, 23, 0.8)", "rgba(23, 23, 23, 1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>

          {/* HEADER */}
          <View style={{ marginTop: -(height * 0.09) }} className="mx-5 mb-6">
            <Text className="mb-3 text-2xl text-white font-bold tracking-wider">{movie?.title}</Text>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-base text-zinc-200 font-medium">
                  {movie?.release_date.split("-")[0]} • {movie?.runtime} min
                </Text>

                <Text className="text-base text-zinc-400 font-medium">{movie?.genres[0].name}</Text>
              </View>

              <View className="items-center">
                <MaterialCommunityIcons name="star" size={24} color={colors.red[600]} />
                <Text className="text-sm text-red-600 font-semibold">{movie?.vote_average.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          {/* DESCRIPTION */}
          <View className="mx-5">
            <Text className="text-sm text-zinc-400 font-regular leading-relaxed">
              {showFullDescription ? movie?.overview : wordLimit(movie?.overview)}

              {movie?.overview && movie?.overview.length > 150 && (
                <TouchableWithoutFeedback onPress={handleToggleDescription}>
                  <Text className="text-sm text-red-600 font-regular">{showFullDescription ? " See less" : " See more"}</Text>
                </TouchableWithoutFeedback>
              )}
            </Text>
          </View>

          <Cast cast={cast} />

          <ListMovies title="Similar Movies" data={similarMovies} trigger={false} />
        </ScrollView>
      )}
    </View>
  );
}
