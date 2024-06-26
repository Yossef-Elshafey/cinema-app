import { AddMoviePayload } from "../../types/Types";

export const addMovieCall = async (
  data: AddMoviePayload,
  image: File,
  token: string | undefined,
) => {
  const payload = new FormData();

  payload.append("name", data.name);
  payload.append("duration", data.duration);
  payload.append("release_date", data.release_date);
  payload.append("hall_id", data.hall_id);
  payload.append("avaliable", data.avaliable.toString() || false.toString());
  payload.append("image", image);

  try {
    const res = await fetch("http://localhost:8000/api/movies", {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(payload);

    const data = await res.json();
    const status = res.status;

    return { data, status };
  } catch (error) {
    console.error("Error uploading the image:", error);
  }
};
