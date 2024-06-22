import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CallSuccess() {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDisplay(!display);
    }, 3000);
    return () => clearTimeout(handler);
  }, []);

  return (
    <>
      {!display && (
        <motion.div
          className="absolute top-0 w-3/4 text-2xl text-green-500 bg-black z-30 h-[100px] flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
        >
          Submit Successfully
        </motion.div>
      )}
    </>
  );
}

export default CallSuccess;
