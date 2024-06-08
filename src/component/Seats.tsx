import { SeatsProps } from "../types/Types";

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
        <button
          id={seat}
          key={seat}
          className="w-full text-white py-6 bg-green-600 mx-auto"
          onClick={handleClick}
        ></button>
      ))}
    </div>
  );
}

export default Seats;
