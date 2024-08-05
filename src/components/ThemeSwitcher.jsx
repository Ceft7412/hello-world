// app/components/ThemeSwitcher.js
"use client";

import { useState } from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { useSelector, useDispatch } from "react-redux";
import { setThemeAction } from "@/redux/themeSlice";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme") || "light"
      : "light"
  );
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setThemeAction(newTheme));
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
    }
    document.documentElement.className = newTheme;
  };

  return (
    <WbSunnyRoundedIcon
      className={`cursor-pointer transition-colors duration-300 ease-in-out  active:scale-105 hover:text-violet-900`}
      onClick={toggleTheme}
    />
  );
};

export default ThemeSwitcher;
