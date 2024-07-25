"use client";
import React, { useState, useEffect } from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { toggleTheme } from "@/redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  console.log(darkTheme);
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

  return (
    <header
      className={`header ${
        darkTheme ? "bg-gray-950 shadow-xl" : "shadow bg-white"
      } fixed  top-0 left-0 right-0 h-[50px] `}
    >
      <div className="header__flex  relative flex  w-full h-full justify-between items-center px-16">
        <div className="header__logo absolute left-[50%] -translate-x-2/4">
          HELLO, <span className="logo__world">WORLD!</span>
        </div>
        <nav className="header__nav-links ml-auto flex gap-2">
          <ul
            className="header__ul mr-5 relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="flex items-center    ">
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
