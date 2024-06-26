import React, { useEffect, useState } from "react";
import { addMovieCall } from "../../api/movies/addMovie";
import { getHalls } from "../../api/movies/hall";
import { useAuth } from "../../api/users/AuthContext";
import CallSuccess from "../../component/CallSuccess";
import { AddMoviePayload, Hall } from "../../types/Types";

function AddMovie() {
  const [halls, setHalls] = useState([] as Hall[]);
  const [image, setImage] = useState<File>({} as File);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({} as AddMoviePayload);
  const auth = useAuth();

  useEffect(() => {
    const call = async () => {
      const data = await getHalls(auth?.tok);
      setHalls(data);
    };
    call();
  }, [auth?.tok]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (success) {
      setSuccess(false);
    }
    const { name, type, checked, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await addMovieCall(formData, image, auth?.tok);
    if (res?.status === 201) {
      setSuccess(true);
    }
  };
  console.log(formData);

  return (
    <>
      {success && <CallSuccess />}
      <form className="flex-1 flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <label className="text-white">
          Name
          <input
            required={true}
            type="text"
            name="name"
            className="input"
            onChange={handleChange}
            value={formData.name || ""}
          />
        </label>
        <label className="text-white">
          Image
          <input
            required={true}
            alt="Put movie Image"
            type="file"
            name="image"
            className="input"
            onChange={handleImage}
          />
        </label>
        <label className="text-white">
          Release Date
          <input
            required={true}
            type="date"
            name="release_date"
            className="input"
            onChange={handleChange}
            value={formData.release_date || ""}
          />
        </label>
        <label className="text-white">
          Duration
          <input
            required={true}
            type="number"
            name="duration"
            className="input"
            onChange={handleChange}
            step={0.1}
            min={0}
            value={String(formData.duration) || ""}
          />
        </label>
        <label className="text-white">
          Available
          <input
            type="checkbox"
            name="avaliable"
            className="ml-4"
            onChange={handleChange}
            checked={formData.avaliable || false}
          />
        </label>
        <label className="text-white">
          Hall
          <select name="hall_id" className="input" onChange={handleChange}>
            <option value="">Select Hall --</option>
            {halls &&
              halls.map((ele: Hall) => (
                <option key={ele.id} value={ele.id}>
                  {ele.name} - {ele.max_seat}
                </option>
              ))}
          </select>
        </label>
        <input type="submit" value="Submit" className="signs cursor-pointer" />
      </form>
    </>
  );
}

export default AddMovie;
