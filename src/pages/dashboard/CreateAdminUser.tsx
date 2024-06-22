import React, { useEffect, useState } from "react";
import { useAuth } from "../../api/users/AuthContext";
import { createAdmin } from "../../api/users/createAdmin";
import BeforeAction from "../../component/Action";
import CallSuccess from "../../component/CallSuccess";
import { SignupData } from "../../types/Types";

function CreateAdminUser() {
  const [prompt, setPrompt] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [formData, setFormData] = useState({} as SignupData);
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = () => {
    setPrompt(true);
    setSuccess(false);
  };

  const resetStates = () => {
    setPrompt(false);
    setAccepted(false);
    setFormData({} as SignupData);
    setSuccess(false);
  };

  useEffect(() => {
    const call = async () => {
      if (accepted) {
        const res = await createAdmin(formData, auth?.tok);
        if (res?.status === 201) {
          resetStates();
          setSuccess(true);
        } else {
          resetStates();
        }
      }
    };
    call();
  }, [accepted]);

  return (
    <>
      {success && <CallSuccess />}
      <BeforeAction
        setPrompt={setPrompt}
        setAccepted={setAccepted}
        prompt={prompt}
      >
        <label className="text-white w-1/2">
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
      </BeforeAction>
      <li
        className="text-xl hover:translate-x-4 transition-all duration-500 cursor-pointer"
        onClick={handleClick}
      >
        Create Manager
      </li>
    </>
  );
}

export default CreateAdminUser;
