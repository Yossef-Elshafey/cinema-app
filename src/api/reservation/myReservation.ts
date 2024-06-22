import { ReservationObj } from "../../types/Types";

export const getReservations = async (token: string | undefined) => {
  const url = "http://localhost:8000/api/reservation";

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const status = res.status;
  const data = (await res.json()) as ReservationObj[];
  return { status, data };
};
