import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { getExpiryDate } from "../../helpers/endDate";
import { AuthContextType } from "../../types/Types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [tok, setTok] = useState("");
  const [cookie, setCookie] = useCookies(["auth_user"]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // helps with keeping the state while refresh manually
    if (cookie.auth_user !== "none" && cookie.auth_user) {
      setIsLogged(true);
      setTok(cookie.auth_user);
    }
  }, [cookie.auth_user]);

  const login = (token: string) => {
    setIsLogged(true);
    setTok(token);
    setCookie("auth_user", token, {
      path: "/",
      expires: getExpiryDate(2),
      secure: true,
      sameSite: "lax",
    });
  };

  const logout = () => {
    setIsLogged(false);
    setTok("");
    setCookie("auth_user", "none", { path: "/", sameSite: "lax" });
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, tok, logout, login, setUserId, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
