// app/components/ThemeProvider.js
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeAction } from "@/redux/themeSlice";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme") || "light"
      : "light"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      dispatch(setThemeAction(storedTheme));
    } else {
      // Optionally set to system preference or default
      const defaultTheme = "light";
      setTheme(defaultTheme);
      dispatch(setThemeAction(defaultTheme));
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
