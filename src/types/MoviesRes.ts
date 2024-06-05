export interface Movie {
  id: number;
  name: string;
  image: string;
  available: boolean;
  duration: string;
  hall_id: number;
  release_date: string;
  slug: string;
}

export interface MoviesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

export interface GlassyBoxProps {
  loading: boolean;
  display: Movie | undefined;
}
