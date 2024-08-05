"use client";
import React from "react";
import { useSelector } from "react-redux";
export default function Category({ children }) {
  const themeColor = useSelector((state) => state.theme.themeColor);
  return (
    <h2
      className={`${
        themeColor === "dark" ? "bg-white text-black" : " bg-gray-950 text-white"
      } p-1 px-2   mb-8`}
    >
      {children}
    </h2>
  );
}
