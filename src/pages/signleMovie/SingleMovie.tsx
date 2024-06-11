import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router";
import { useSingleMovie } from "../../api/movies/useSingleMovie";
import Seats from "./Seats";
import NotFound from "../NotFound";

function SingleMovie() {
  // NOTE: state is coming from {Link} in GlassyBox.tsx carries the clicked movie id
  const { state } = useLocation();
  const { loading, error, movie } = useSingleMovie(state);
  const [reservedSeats, setReservedSeats] = useState(new Set());

  if (loading) {
    return <div className="text-green-500">Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ele = e.target as HTMLButtonElement;
    const seatName = ele.getAttribute("id");

    if (seatName) {
      setReservedSeats((prevReservedSeats) => {
        const newReserveSeats = new Set(prevReservedSeats);

        // toggle add,delete on click
        if (newReserveSeats.has(seatName)) {
          newReserveSeats.delete(seatName);
        } else {
          newReserveSeats.add(seatName);
        }

        return newReserveSeats;
      });
    }

    ele.classList.toggle("bg-red-700");
  };

  return (
    <>
      {movie && (
        <>
          <div className="h-screen relative py-8 flex items-center justify-center">
            <motion.img
              src={movie.image}
              alt="some"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="h-full w-full rounded-md"
            />
            <div className="w-full h-full bg-black/60 backdrop-blur-sm p-4 rounded-md">
              <h2 className="text-white text-center text-2xl">
                Choose required seats
              </h2>
              <Seats max={movie.hall_id.max_seat} handleClick={handleClick} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SingleMovie;
