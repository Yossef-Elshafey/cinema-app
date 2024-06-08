import React from "react";
import { MdNotListedLocation } from "react-icons/md";
import { useNavigate } from "react-router";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen center-position z-50 flex gap-y-4 flex-col items-center justify-center">
      <h2 className="text-white text-5xl">Sorry, Page is not found</h2>
      <MdNotListedLocation className="text-8xl text-white" />
      <button className="signs" onClick={() => navigate("/")}>
        Back Home
      </button>
    </div>
  );
}

export default NotFound;
