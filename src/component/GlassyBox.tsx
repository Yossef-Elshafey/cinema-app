import React, { useState } from "react";
import { GlassyBoxProps } from "../types/MoviesRes";
import { motion } from "framer-motion";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function GlassyBox({ loading, display, forward, previous }: GlassyBoxProps) {
  const [key, setKey] = useState(0);

  const handleForward = () => {
    forward();
    setKey(key + 1);
  };
  const handlePrev = () => {
    previous();
    setKey(key - 1);
  };

  return (
    <div className="h-[calc(100vh-7rem)] mt-4">
      <motion.div
        key={key} // any change value to apply the animation again or rerender
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "linear", duration: 1 }}
        className="text-white h-full group rounded-xl relative"
        id={`${display?.id}`}
      >
        <FaArrowCircleRight
          onClick={handleForward}
          className="text-white text-2xl absolute cursor-pointer -right-10 top-1/2 -translate-y-1/2 z-40"
        />
        <FaArrowCircleLeft
          onClick={handlePrev}
          className="text-white text-2xl absolute cursor-pointer -left-10 top-1/2 -translate-y-1/2 z-40"
        />
        {loading && <div className="text-white">Loading...</div>}
        <img
          src={display?.image}
          alt="wallpaper"
          className="w-full h-full contrast-100 rounded-xl"
        />
        <div className="group-hover:h-1/4 flex justify-center flex-col overflow-hidden w-full h-0 p-4 bg-black/40 absolute bottom-0 backdrop-blur-sm z-40 transition-all duration-500">
          <h2 className="text-3xl capitalize">{display?.name}</h2>
          <p className="text-yellow-500">
            {display?.avaliable ? "Now Available" : "Coming soon"}
          </p>
          <p className="text-yellow-500">Release: {display?.release_date}</p>
          <p className="text-yellow-500">Hall: {display?.hall_id.name}</p>
          {display?.avaliable && (
            <Link
              to={`${display?.slug}`}
              className="bg-yellow-500 w-fit self-end p-2 rounded-md"
            >
              Get a seat now !
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default GlassyBox;
