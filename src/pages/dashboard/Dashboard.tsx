import { useLocalStorage } from "../../helpers/useLocalStorage";
import NotFound from "./../NotFound";
import { motion } from "framer-motion";
import CreateAdminUser from "./CreateAdminUser";
import ListReservations from "./ListReservations";
import { useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import AddMovie from "./AddMovie";

interface DisplayObj {
  [key: string]: boolean;
}

function Dashboard() {
  const { getItem } = useLocalStorage("isadmin");

  const [displays, setDisplays] = useState<DisplayObj>({
    reservations: false,
    addMovie: false,
    createAdmin: false,
  });

  const handleDisplay = (e: React.MouseEvent<HTMLLIElement>) => {
    const newDisplays: DisplayObj = {};

    for (let key in displays) {
      newDisplays[key] = false;
    }

    const id = e.currentTarget.id;
    setDisplays({ ...newDisplays, [id]: true });
  };
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
            id="reservations"
            onClick={handleDisplay}
          >
            Reservations info
          </li>
          <li
            className="text-xl hover:translate-x-4 transition-all duration-500 cursor-pointer"
            id="addMovie"
            onClick={handleDisplay}
          >
            Add movie
          </li>
        </motion.ul>
        {displays.reservations && <ListReservations />}
        {displays.addMovie && <AddMovie />}
      </div>
    </>
  );
}

export default Dashboard;
