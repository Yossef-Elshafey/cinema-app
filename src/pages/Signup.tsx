import React, { useState } from "react";
import { useAuth } from "../api/users/AuthContext";
import { signupCall } from "../api/users/SignUpCall";
import { SignupData } from "../types/Types";

function Signup() {
  const [formData, setFormData] = useState({} as SignupData);
  const auth = useAuth();
  const [error, setError] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { data, status } = await signupCall(formData);

    if (status === 201) {
      auth?.login(data.token);
    } else {
      setError(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="text-white w-1/2">
        <p className="text-red-500 text-start">{error?.username}</p>
        First Name
        <input
          required={true}
          type="text"
          className="input"
          name="first_name"
          onChange={handleChange}
        />
      </label>
      <label className="text-white w-1/2">
        Last Name
        <input
          required={true}
          type="text"
          name="last_name"
          className="input"
          onChange={handleChange}
        />
      </label>
      <label className="text-white w-1/2">
        <p className="text-red-500 text-start">{error?.email}</p>
        Email
        <input
          required={true}
          name="email"
          type="email"
          className="input"
          onChange={handleChange}
        />
      </label>
      <label className="text-white w-1/2">
        <p className="text-red-500 text-start">{error?.password}</p>
        Password
        <input
          required={true}
          name="password"
          type="password"
          className="input"
          onChange={handleChange}
        />
      </label>
      <label className="text-white w-1/2">
        Retype Password
        <input
          required={true}
          type="password"
          name="password_compare"
          className="input"
          onChange={handleChange}
        />
      </label>
      <input
        type="submit"
        value="Submit"
        className="text-white px-4 py-2 w-1/2 rounded border bg-orange-500 cursor-pointer"
      />
    </form>
  );
}

export default Signup;
