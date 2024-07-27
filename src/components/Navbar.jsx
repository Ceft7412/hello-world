"use client";
import React, { useState, useEffect } from "react";

// Icons
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

// Redux
import { toggleTheme } from "@/redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";
import { auth, googleProvider, db } from "@/firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { setUser } from "@/redux/authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const user = useSelector((state) => state.auth.user);
 
  const auth = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Perform when dark theme changes
  useEffect(() => {
    document.body.className = darkTheme ? "darkTheme" : "";
  }, [darkTheme]);

  const modalVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        // type: "spring",
        // stiffness: 120,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If the user doesn't exist, create a new document with the user's ID as the document ID
        await setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: "user",
          // Add any additional fields you want to store
        });
      }

      dispatch(setUser(result.user));
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={`header ${
        darkTheme ? "bg-gray-950 shadow-xl" : "shadow bg-white"
      } fixed  z-20 top-0 left-0 right-0 h-[50px] `}
    >
      <div className="header__flex  relative flex  w-full h-full justify-between items-center px-16">
        <div className="header__logo absolute left-[50%] -translate-x-2/4">
          HELLO, <span className="logo__world">WORLD!</span>
        </div>
        <nav className="header__nav-links ml-auto flex items-center gap-2">
          <ul
            className="header__ul mr-5 relative cursor-pointer "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className={`flex items-center`}>
              Topics <ExpandMoreRoundedIcon />
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={`header__ul-links ${
                    darkTheme ? "bg-gray-950" : "bg-white"
                  } shadow w-36 absolute right-2`}
                  variants={modalVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <li className="header__link p-2 hover:bg-violet-600 hover:text-white">
                    JS
                  </li>
                  <li className="header__link p-2 hover:bg-violet-600 hover:text-white">
                    REACT
                  </li>
                  <li className="header__link p-2 hover:bg-violet-600 hover:text-white">
                    TAILWIND
                  </li>
                  <li className="header__link p-2 hover:bg-violet-600 hover:text-white">
                    SASS
                  </li>
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
          <div className="mr-6 flex items-center gap-5 ">
            {user && (
              <div className="relative">
                <div onClick={() => setIsModalOpen(!isModalOpen)}>
                  <Image
                    className="rounded-full"
                    src={user.photoURL}
                    alt={user.name}
                    width={40}
                    height={40}
                  />
                  <ExpandMoreRoundedIcon
                    className={`absolute bg-gray-300 ${
                      darkTheme ? "bg-gray-900" : ""
                    } rounded-full text-[12px] right-[1px] bottom-0`}
                  />
                </div>

                <AnimatePresence>
                  {isModalOpen && (
                    <motion.div
                      className={`modal-out  ${
                        darkTheme ? "bg-gray-950" : "bg-white"
                      } rounded absolute shadow-md right-0`}
                      variants={modalVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <p
                        className="p-2 whitespace-nowrap cursor-pointer hover:bg-sky-300/[.06]"
                        onClick={user ? signOut : null}
                      >
                        Sign out
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {!user && (
              <span className="cursor-pointer" onClick={signInWithGoogle}>
                Sign In
              </span>
            )}
          </div>
          <WbSunnyRoundedIcon
            className={`cursor-pointer transition-colors duration-300 ease-in-out  hover:text-violet-900`}
            onClick={() => dispatch(toggleTheme())}
          />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
