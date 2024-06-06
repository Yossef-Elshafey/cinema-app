export interface Movie {
  id: number;
  name: string;
  image: string;
  avaliable: boolean; // written wrong
  duration: string;
  hall_id: {
    id: number;
    name: string;
    max_seat: number;
  };
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
  forward: () => void;
  previous: () => void;
}
