import React from "react";
import { BeforeActionProps } from "../types/Types";
import { motion } from "framer-motion";

function BeforeAction({
  children,
  setAccepted,
  show = false,
}: BeforeActionProps) {
  // document.body.style.overflow = "hidden";
  // document.body.style.pointerEvents = "none";
  return (
    <>
      {show && (
        <motion.div className="w-3/4 h-1/6 top-0 fixed p-4 mx-auto pointer-events-auto opacity-90 backdrop-blur-md bg-black z-30">
          <div className="flex flex-col items-center h-full justify-between">
            {children}
            <div className="ml-auto flex gap-x-4">
              <button className="bg-orange-500 p-3 rounded-md">Continue</button>
              <button className="bg-orange-500 p-3 rounded-md">Exit</button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default BeforeAction;
