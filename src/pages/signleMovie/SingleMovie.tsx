import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Movie, ReservationPayload } from "../../types/Types";
import Seats from "./Seats";
import Navbar from "../../component/navbar/Navbar";
import { getSingleMovie } from "../../api/movies/singleMovie";
import NotFound from "../NotFound";
import BeforeAction from "../../component/Action";
import { useAuth } from "../../api/users/AuthContext";
import { addReservation } from "../../api/reservation/sendReservation";
import SigninRequired from "../../component/SigninRequired";
import CallSuccess from "../../component/CallSuccess";

function SingleMovie() {
  const { state } = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reservedSeats, setReservedSeats] = useState<Set<string>>(new Set());
  const auth = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // toggle colors while boxes(seats) clicked ,
    // add clicked boxes to reservedSeats
    setSuccess(false);
    const ele = e.target as HTMLButtonElement;
    const seatName = ele.getAttribute("id");

    if (seatName) {
      setReservedSeats((prevReservedSeats) => {
        const newReserveSeats = new Set(prevReservedSeats);

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

  const resetAfterReservation = () => {
    // resert states , boxes colors after reservation success
    setReservedSeats(new Set());
    setAccepted(false);
    const seatsHolder = document.querySelector(".seats-container");
    const boxes = seatsHolder?.children;

    if (boxes) {
      Array.from(boxes).forEach((box) => {
        const button = box as HTMLButtonElement;
        if (button.classList.contains("bg-red-700")) {
          button.classList.remove("bg-red-700");
        }
      });
    }
  };

  useEffect(() => {
    // get movie by id came from GlassyBox.tsx button
    const fetchMovie = async () => {
      try {
        const data = await getSingleMovie(state);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [state]);

  useEffect(() => {
    // apply reservation
    const sendRes = async () => {
      if (accepted) {
        const payload: ReservationPayload = {
          movie_id: state,
          customer: auth?.userId as number | null,
          num_of_seats: Array.from(reservedSeats).length,
          seat_names: Array.from(reservedSeats).join(","),
        };

        const { status, data } = await addReservation(auth?.tok, payload);

        if (status === 201) {
          resetAfterReservation();
          setSuccess(true);
        }
      }
    };
    sendRes();
  }, [accepted]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <NotFound />;
  }

  if (!auth?.isLogged) {
    return <SigninRequired />;
  }

  return (
    <>
      <Navbar />
      {success && <CallSuccess />}
      <BeforeAction
        setPrompt={setPrompt}
        setAccepted={setAccepted}
        prompt={prompt}
      >
        <h2 className="text-white text-2xl">Reservation Info:</h2>
        {Array.from(reservedSeats).length > 0 ? (
          <ul className="text-white">
            <li>Movie: {movie.name}</li>
            <li>Seats: {Array.from(reservedSeats).join(",")}</li>
            <li>Seats Count: {Array.from(reservedSeats).length}</li>
            <li>Your Personal ID: {auth?.userId}</li>
          </ul>
        ) : (
          <p className="text-red-500">Please select seats</p> // if no seats selected
        )}
      </BeforeAction>
      <div className="h-[calc(100vh-100px)] relative py-8 flex items-center justify-center">
        <motion.img
          src={movie.image}
          alt={movie.name}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className="h-full w-full rounded-md"
        />
        <div className="w-full h-full bg-black/60 backdrop-blur-sm p-4 rounded-md">
          <h2 className="text-white text-center text-2xl">
            Choose required seats
          </h2>
          {movie.hall && <Seats hall={movie.hall} handleClick={handleClick} />}
          <button
            className="bg-orange-500 py-2 w-full text-white"
            onClick={() => setPrompt(true)}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleMovie;
