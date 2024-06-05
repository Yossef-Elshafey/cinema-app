import { useEffect, useRef, useState } from "react";

import { MoviesResponse } from "../types/MoviesRes";
export const useGetMovies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MoviesResponse | null>(null);
  const [page, setPage] = useState<number>(1);
  const perpage = 2;

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
      const url = `http://127.0.0.1:8000/api/movies/all?page_size=${perpage}&p=${page}`;

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });
        const data = await response.json();
        setMovies(data);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(`${url} went wrong`);
        } else {
          console.log("aborted");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, perpage]);

  return { movies, loading, setPage };
};

export default useGetMovies;
