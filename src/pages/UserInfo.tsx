import { useEffect, useState } from "react";
import { getReservations } from "../api/reservation/myReservation";
import { useAuth } from "../api/users/AuthContext";
import Navbar from "../component/navbar/Navbar";
import { ReservationObj } from "../types/Types";
import ListReservations from "./dashboard/ListReservations";

function UserInfo() {
  const auth = useAuth();
  const [data, setData] = useState([] as ReservationObj[]);
  useEffect(() => {
    const call = async () => {
      if (auth?.tok) {
        const res = await getReservations(auth.tok);
        setData(res.data);
      }
    };
    call();
  }, [auth?.tok]);
  console.log(data);

  return (
    <div>
      <Navbar />
      <ListReservations />
    </div>
  );
}

export default UserInfo;
