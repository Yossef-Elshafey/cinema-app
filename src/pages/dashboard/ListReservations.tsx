import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { getReservations } from "../../api/reservation/myReservation";
import { useAuth } from "../../api/users/AuthContext";
import { ReservationObj } from "../../types/Types";
import { useNavigate } from "react-router";

function ListReservations() {
  const [data, setData] = useState([] as ReservationObj[]);
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    const call = async () => {
      const res = await getReservations(auth?.tok);
      setData(res.data);
    };
    call();
  }, [auth?.tok]);

  const deleteReservation = async (e: React.MouseEvent) => {
    const id = e.currentTarget.parentElement?.getAttribute("id");
    const res = await fetch(`http://localhost:8000/api/reservation/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${auth?.tok}`,
      },
    });
    if (res.status === 204) {
      setData((prev) => {
        return prev.filter((reservation) => reservation.id !== Number(id));
      });
    }
  };

  useEffect(() => {
    if (!auth?.isLogged) {
      navigate("/");
    }
  }, [auth?.isLogged, navigate]);

  return (
    <motion.div
      className="text-white bg-stone-700 flex-1 h-full overflow-scroll rounded-md p-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {data.length !== 0 && auth?.tok ? (
        data.map((res) => (
          <div
            key={res.id}
            id={String(res.id)}
            className="grid grid-cols-5 items-center justify-items-center text-white border-b p-4"
          >
            <p>{res.customer}</p>
            <p>{res.movie_id}</p>
            <p>{res.reserve_date}</p>
            <p>{res.num_of_seats}</p>
            <MdDelete
              className="text-red-600 cursor-pointer"
              onClick={deleteReservation}
            />
          </div>
        ))
      ) : (
        <div>No reservations</div>
      )}
    </motion.div>
  );
}

export default ListReservations;
