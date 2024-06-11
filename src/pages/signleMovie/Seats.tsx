import { SeatsProps } from "../../types/Types";
import { motion } from "framer-motion";

function Seats({ max, handleClick }: SeatsProps) {
  const columns = 5;
  // Maximum 30 seat
  const letters = ["a", "b", "c", "d", "e", "f"];
  const seats = [];
  let seatNumber = 0;
  let seatLetterInd = 0;

  for (let i = 0; i < max; i++) {
    if (seatNumber === columns) {
      seatNumber = 0;
      seatLetterInd += 1;
    }
    seats.push(`${letters[seatLetterInd]}${seatNumber + 1}`);
    seatNumber += 1;
  }

  return (
    <div className="grid grid-cols-5 gap-4 my-auto p-4 rounded-md">
      {seats.map((seat) => (
        <motion.button
          id={seat}
          key={seat}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeInOut", duration: Number(seat[1]) }}
          className="w-full text-white py-6 bg-green-600 mx-auto"
          onClick={handleClick}
        ></motion.button>
      ))}
    </div>
  );
}

export default Seats;
