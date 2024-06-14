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

export interface SeatsProps {
  hall: {
    id: number;
    name: string;
    max_seat: number;
  };
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_compare: string;
}

export interface SignUpRes {
  id: number;
  token: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  isLogged: boolean;
  tok: string;
  logout: () => void;
  login: (token: string) => void;
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<any>>;
}

export interface UserInfoRes {
  // NOTE: this interface doesn't contain all the keys
  date_joined: string;
  email: string;
  first_name: string;
  id: number;
  is_staff: boolean;
  is_superuser: boolean;
  username: string;
}

export interface BeforeActionProps {
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  prompt: boolean;
  setPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SigninData {
  email: string;
  password: string;
}
