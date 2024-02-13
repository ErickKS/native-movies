import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const trendingEndPoint = `${BASE_URL}/trending/movie/day`;
const upcomingEndPoint = `${BASE_URL}/movie/upcoming`;
const topRatedEndPoint = `${BASE_URL}/movie/top_rated`;
const searchEndPoint = `${BASE_URL}/search/movie`;

// CALL

async function apiCall(url: string, params?: { [key: string]: string }) {
  try {
    const request = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTczYjQ0NmI3MDI3ZGE0NTE0ZjA5NjJmMjYzZjY1YiIsInN1YiI6IjY1YzdiOTU1YTMxNDQwMDE2NThkNDhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CIUg2zBhwoxSO5Q3tb7GF1GHvMK4XzdimtU_AJiQUkE",
      },
      params: params || {},
    });

    return request.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function fetchMovies(type: "trending" | "upcoming" | "top-rated") {
  const endpoints = {
    trending: trendingEndPoint,
    upcoming: upcomingEndPoint,
    "top-rated": topRatedEndPoint,
  };

  const endPoint = endpoints[type];
  return apiCall(endPoint);
}

export function fetchMovieData(id: string | string[], subEndpoint: string) {
  const endPoint = `${BASE_URL}/movie/${id}${subEndpoint}`;
  return apiCall(endPoint);
}

export function searchMovies(params: { query: string; page: string }) {
  return apiCall(searchEndPoint, params);
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
