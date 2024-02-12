import axios from "axios";

const APIKEY = "7e73b446b7027da4514f0962f263f65b";
const baseURL = "https://api.themoviedb.org/3";

const trendingEndPoint = `${baseURL}/trending/movie/day`;
const upcomingEndPoint = `${baseURL}/movie/upcoming`;
const topRatedEndPoint = `${baseURL}/movie/top_rated`;
const searchMoviesEndPoint = `${baseURL}/search/movie`;

const movieDetailsEndPoint = (id: string | string[]) => `${baseURL}/movie/${id}`;
const movieCreditsEndPoint = (id: string | string[]) => `${baseURL}/movie/${id}/credits`;
const similarMoviesEndPoint = (id: string | string[]) => `${baseURL}/movie/${id}/similar`;

// CALL

async function apiCall(url: string, params?: { query: string; page: string }) {
  try {
    const request = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTczYjQ0NmI3MDI3ZGE0NTE0ZjA5NjJmMjYzZjY1YiIsInN1YiI6IjY1YzdiOTU1YTMxNDQwMDE2NThkNDhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CIUg2zBhwoxSO5Q3tb7GF1GHvMK4XzdimtU_AJiQUkE",
      },
      params: params ? params : {},
    });
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

export function fetchTrendingMovies() {
  return apiCall(trendingEndPoint);
}
export function fetchUpcomingMovies() {
  return apiCall(upcomingEndPoint);
}
export function fetchTopRatedMovies() {
  return apiCall(topRatedEndPoint);
}

export function fetchMovieDetails(id: string | string[]) {
  return apiCall(movieDetailsEndPoint(id));
}
export function fetchMovieCredits(id: string | string[]) {
  return apiCall(movieCreditsEndPoint(id));
}
export function fetchSimilarMovies(id: string | string[]) {
  return apiCall(similarMoviesEndPoint(id));
}

export function searchMovies(params: { query: string; page: string }) {
  return apiCall(searchMoviesEndPoint, params);
}

// IMAGES
export const image500 = (path: string) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};
export const image342 = (path: string) => {
  return `https://image.tmdb.org/t/p/w342${path}`;
};
export const image185 = (path: string) => {
  return `https://image.tmdb.org/t/p/w185${path}`;
};
