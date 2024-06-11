import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../api/users/AuthContext";

function PreventToGoPath({ children }: { children: ReactNode }) {
  const loggedNotToGo = ["/sign-up", "/sign-in"];

  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    for (let forb of loggedNotToGo) {
      if (auth?.isLogged && location.pathname === forb) {
        navigate("/");
      }
    }
  }, [auth?.isLogged, location, navigate]);
  return <>{children}</>;
}

export default PreventToGoPath;
