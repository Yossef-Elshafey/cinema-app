import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../api/users/AuthContext";
import NonLoggedNav from "./NonLoggedNav";
import LoggedNav from "./LoggedNav";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../helpers/useLocalStorage";

function Navbar() {
  const auth = useAuth();
  const [homeNeed, setHomeNeed] = useState(false);
  const { getItem } = useLocalStorage("isadmin");

  useEffect(() => {
    const path = document.location.pathname;
    if (path !== "/") {
      setHomeNeed(true);
    }
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-20  max-h-20 text-white flex items-center justify-between"
    >
      <motion.ul
        className="f-horizontal"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <Link to="/about" className="signs">
          About us
        </Link>
        {getItem("isadmin") && document.location.pathname !== "/dashboard" && (
          <Link to="/dashboard" className="signs">
            Dashboard
          </Link>
        )}
        {homeNeed && (
          <Link to="/" className="signs">
            Home
          </Link>
        )}
      </motion.ul>

      {!auth?.isLogged ? <NonLoggedNav /> : <LoggedNav />}
    </motion.nav>
  );
}

export default Navbar;
