import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../api/users/AuthContext";
import { myInfo } from "../../api/users/me";
import { signout } from "../../api/users/signout";
import { UserInfoRes } from "../../types/Types";
import { FaHandPaper } from "react-icons/fa";
import BeforeAction from "../Action";

function LoggedNav() {
  const [userInfo, setUserInfo] = useState<UserInfoRes>();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const auth = useAuth();

  const handleClick = () => {
    setDisplayMenu(!displayMenu);
  };

  const displayPrompt = () => {
    setPrompt(true);
    if (displayMenu) {
      setDisplayMenu(!displayMenu);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const data = await myInfo(auth?.tok);
      if (data) {
        setUserInfo(data);
      }
    };
    getInfo();
  }, []);

  useEffect(() => {
    if (accepted) {
      const logout = async () => {
        const res = await signout(auth?.tok);
        if (res === 204) {
          auth?.logout();
          // document.location.reload();
        }
      };
      logout();
    }
  });

  return (
    <>
      <BeforeAction
        setAccepted={setAccepted}
        prompt={prompt}
        setPrompt={setPrompt}
      >
        <h2>Do you want to sign out</h2>
      </BeforeAction>
      <div className="relative">
        <div
          className="flex items-center gap-x-4 cursor-pointer select-none capitalize"
          onClick={handleClick}
        >
          <p>{userInfo?.username}</p>
          <FaHandPaper className="text-orange-500" />
        </div>
        {displayMenu && (
          <motion.ul
            className="absolute top-10 z-40 w-full min-w-fit p-2 bg-gray-800 rounded-xl backdrop-blur-md opacity-50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <li className="p-2 font-bold cursor-pointer hover:underline">
              My info
            </li>
            <li
              className="p-2 font-bold cursor-pointer hover:underline"
              onClick={displayPrompt}
            >
              Sign out
            </li>
          </motion.ul>
        )}
      </div>
    </>
  );
}

export default LoggedNav;
