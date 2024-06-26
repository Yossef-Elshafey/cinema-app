import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../helpers/useLocalStorage";

function Splash() {
  const { getItem, setItem } = useLocalStorage("visited");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // if user has seen the splash screen before
    const visited = getItem("visited");
    let timer: ReturnType<typeof setTimeout>;
    if (visited) {
      setLoading(false);
    } else {
      timer = setTimeout(() => {
        setLoading(false);
      }, 6000);
    }

    setItem(true);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute h-screen center-position bg-black w-full z-50">
          <img
            src={`${process.env.PUBLIC_URL}/spider.webp`}
            alt="Loading..."
            className="h-[calc(100vh-10%)] min-w-full center-position"
          />
        </div>
      )}
    </>
  );
}

export default Splash;
