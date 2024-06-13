import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function SigninRequired() {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center">
        <h2 className="text-white text-2xl">
          You must sign in before applying reservations
        </h2>
        <div className="flex-col flex text-white underline ">
          <Link to="/sign-in" className="text-cyan-500 text-xl">
            Have an account ?
          </Link>
          <Link to="/sign-up" className="text-cyan-500 text-xl">
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}

export default SigninRequired;
