import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesParams {
  query: string;
}
interface MovieResponse {
  results: Movie[];
}

export async function fetchMovies({
  query,
}: FetchMoviesParams): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  console.log("🔍 Запит на фільми з query:", query);

  try {
    const response = await axios.get<MovieResponse>(API_URL, {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Отримано фільми:", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}
