import { useLocalStorage } from "../../helpers/useLocalStorage";
import NotFound from "./../NotFound";
import { motion } from "framer-motion";
import CreateAdminUser from "./CreateAdminUser";
import ListReservations from "./ListReservations";
import { useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import AddMovie from "./AddMovie";

function Dashboard() {
  const { getItem } = useLocalStorage("isadmin");
  const [displayReservations, setDisplayReservations] = useState(false);
  const [displayAddMovie, setDisplayAddMovie] = useState(false);
  if (!getItem("isadmin")) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-100px)] flex items-center justify-between gap-x-12">
        <motion.ul
          className="flex flex-col h-full text-white w-fit items-center justify-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <CreateAdminUser />

          <li
            className="text-xl hover:translate-x-4 transition-all duration-500 cursor-pointer"
            onClick={() => setDisplayReservations(true)}
          >
            Reservations info
          </li>
          <li
            className="text-xl hover:translate-x-4 transition-all duration-500 cursor-pointer"
            onClick={() => setDisplayAddMovie(true)}
          >
            Add movie
          </li>
        </motion.ul>
        {displayReservations && <ListReservations />}
        {displayAddMovie && <AddMovie />}
      </div>
    </>
  );
}

export default Dashboard;
