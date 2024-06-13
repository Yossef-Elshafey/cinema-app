import { useEffect, useState } from "react";
import { Movie } from "../../types/Types";
import { useAuth } from "../users/AuthContext";

export const useSingleMovie = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState(false);
  const [notSignedin, setNotSignedin] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.isLogged) {
      setNotSignedin(true);
    }
    const getSingleMovie = async () => {
      setLoading(true);
      const url = `http://127.0.0.1:8000/api/movies/${id}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          setError(true); // 404 case
        }
        const data = await res.json();
        setMovie(data);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getSingleMovie();
  }, []);
  return { loading, movie, error, notSignedin };
};
