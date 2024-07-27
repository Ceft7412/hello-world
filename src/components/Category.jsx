"use client";
import React from "react";
import { useSelector } from "react-redux";
export default function Category({ children }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <h2
      className={`${
        darkTheme ? "bg-white text-black" : " bg-gray-950 text-white"
      } p-1 px-2 rounded mb-8`}
    >
      {children}
    </h2>
  );
}
