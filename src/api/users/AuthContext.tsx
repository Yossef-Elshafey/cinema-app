import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { AuthContextType } from "../../types/Types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [tok, setTok] = useState("");
  const [cookie, setCookie] = useCookies(["auth_user"]);

  useEffect(() => {
    if (cookie.auth_user) {
      setIsLogged(!isLogged);
      setTok(cookie.auth_user);
    }
  }, [cookie.auth_user]);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, tok }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
