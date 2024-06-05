import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-20  max-h-20 border-b border-b-white text-white flex justify-between"
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
      </motion.ul>
      <div className="flex-1 mx-20 my-auto relative">
        <input
          type="search"
          className="w-full py-2 focus:outline rounded-xl bg-transparent px-4 "
        />
        <FaSearch className="absolute top-1/2 right-10 -translate-y-1/2" />
      </div>

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
    </motion.nav>
  );
}

export default Navbar;
