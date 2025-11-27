// import axios from "axios";
// import type { MovieResponse } from "../types/movie";

// const BASE_URL = "https://api.themoviedb.org/3";

// export const fetchMovies = async (
//   query: string,
//   page: number = 1
// ): Promise<MovieResponse> => {
//   const token = import.meta.env.VITE_TMDB_TOKEN;

//   const { data } = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
//     params: {
//       query,
//       include_adult: false,
//       language: "en-US",
//       page,
//     },
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return data;
// };
