import React from "react";
import { useLocalStorage } from "../helpers/useLocalStorage";
import NotFound from "./NotFound";
import { motion } from "framer-motion";

function Dashboard() {
  const { getItem } = useLocalStorage("isadmin");
  if (!getItem("isadmin")) {
    return <NotFound />;
  }
  return (
    <motion.ul
      className="flex flex-col h-screen text-white w-fit items-center justify-center"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <li className="text-xl hover:translate-x-4 transition-all duration-500 cursor-pointer">
        Create Manager
      </li>
      <li className="text-xl hover:translate-x-4 transition-all duration-500 cursor-pointer">
        reservations info
      </li>
    </motion.ul>
  );
}

export default Dashboard;
