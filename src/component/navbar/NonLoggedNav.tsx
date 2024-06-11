import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NonLoggedNav() {
  return (
    <motion.ul
      className="f-horizontal"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <Link to="/sign-in" className="signs">
        Sign in
      </Link>
      <Link to="/sign-up" className="signs">
        Sign up
      </Link>
    </motion.ul>
  );
}

export default NonLoggedNav;
