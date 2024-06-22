import React, { useEffect } from "react";
import { BeforeActionProps } from "../types/Types";
import { motion } from "framer-motion";

function BeforeAction({
  children,
  setAccepted,
  prompt,
  setPrompt,
}: BeforeActionProps) {
  useEffect(() => {
    if (prompt) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    }
  }, [prompt]);

  const handleAccepted = () => {
    setAccepted(true);
    setPrompt(!prompt);
  };
  return (
    <>
      {prompt && (
        <motion.div
          className="h-fit w-3/4 p-4 backdrop-blur-md center-position pointer-events-auto bg-black z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ ease: "linear", duration: 1 }}
        >
          <div className="flex flex-col items-center h-full justify-between">
            {children}
            <div className="ml-auto flex gap-x-4">
              <button
                className="bg-orange-500 p-3 rounded-md"
                onClick={handleAccepted}
              >
                Continue
              </button>
              <button
                className="bg-orange-500 p-3 rounded-md"
                onClick={() => setPrompt(!prompt)}
              >
                Exit
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default BeforeAction;
