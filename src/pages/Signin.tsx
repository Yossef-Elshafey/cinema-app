import React, { useState } from "react";
import { motion } from "framer-motion";
import { SigninData } from "../types/Types";
import { signIn } from "../api/users/signin";
import { useAuth } from "../api/users/AuthContext";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../helpers/useLocalStorage";
import Navbar from "../component/navbar/Navbar";

function Signin() {
  const [formData, setFormData] = useState({} as SigninData);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { setItem } = useLocalStorage("isadmin");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const { data, status } = await signIn(formData);

    if (status === 200) {
      auth?.login(data.token);

      if (data.admin) {
        navigate("/dashboard");
        setItem(data.admin);
      } else {
        navigate("/");
      }
    } else {
      setError(true);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="form text-white"
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 50 }}
      transition={{ ease: "easeIn", duration: 1 }}
    >
      {error && <p className="text-rose-500">Invalid Credentials</p>}
      <label>
        Email
        <input
          type="email"
          name="email"
          className="input"
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          className="input"
          onChange={handleChange}
        />
      </label>
      <input
        type="submit"
        value="Submit"
        className="text-white px-4 py-2 rounded border bg-orange-500 cursor-pointer"
      />
    </motion.form>
  );
}

export default Signin;
