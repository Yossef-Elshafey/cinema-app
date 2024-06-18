import { ReservationPayload } from "../../types/Types";

export const addReservation = async (
  token: string | undefined,
  payload: ReservationPayload,
) => {
  const url = "http://localhost:8000/api/reservation";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const status = res.status;
  const data = await res.json();
  return { status, data };
};
