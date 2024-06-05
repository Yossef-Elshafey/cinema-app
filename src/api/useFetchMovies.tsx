import { useEffect, useRef, useState } from "react";

interface Movie {
  id: number;
  name: string;
  image: string;
  available: boolean;
  duration: string;
  hall_id: number;
  release_date: string;
  slug: string;
}

interface MoviesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

export const useGetMovies = () => {
  const [loading, setLoading] = useState(false); // the caller manage loading state
  const [movies, setMovies] = useState<MoviesResponse | null>();
  const [page, setPage] = useState<number>(1);
  const url = "http://127.0.0.1:8000/";
  const path = `api/movies/all?page_size=2?p=${1}`;
  const abortControllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    const res = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setLoading(true);
      try {
        const call = await fetch(`${url}${path}`, {
          signal: abortControllerRef.current?.signal,
        });
        const data = (await call.json()) as MoviesResponse;
        setMovies(data);
      } catch (e: any) {
        if (e.name === "AbortError") {
          return;
        }
        console.error(`${path} went wrong`);
      } finally {
        setLoading(false);
      }
    };
    res();
  }, [page]);

  return { movies, loading, setPage };
};
