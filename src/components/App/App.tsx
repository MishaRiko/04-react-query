import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import type { MovieResponse } from "../../services/movieService";
// import { fetchMovies } from "../../api/movies";
import toast from "react-hot-toast";
import styles from "./App.module.css";
import { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

// function App() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleSearch = async (query: string) => {
//     if (!query.trim()) {
//       toast.error("Please enter your search query.");
//       return;
//     }

//     setMovies([]);
//     setError(false);
//     setLoading(true);

//     try {
//       const results = await fetchMovies({ query });

//       if (results.length === 0) {
//         toast.error("No movies found for your request.");
//       }

//       setMovies(results);
//     } catch {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <SearchBar onSubmit={handleSearch} />
//       {loading && <Loader />}
//       {error && <ErrorMessage />}
//       {!loading && !error && movies.length > 0 && (
//         <MovieGrid movies={movies} onSelect={setSelectedMovie} />
//       )}
//       {selectedMovie && (
//         <MovieModal
//           movie={selectedMovie}
//           onClose={() => setSelectedMovie(null)}
//         />
//       )}
//     </>
//   );
// }

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 5000,
  });

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  return (
    <>
      <Toaster />
      <SearchBar
        onSubmit={(q: string) => {
          setQuery(q);
          setPage(1);
        }}
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {data?.total_pages && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </>
  );
}
export default App;
