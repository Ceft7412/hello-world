"use client";
import React from "react";
import { useSelector } from "react-redux";

function CardContainer({ children }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <section
      className={`border-b-[3px] sm:h-70 sm:hover:scale-105
   transition-transform duration-[220ms] px-2 sm:px-6 py-2 sm:hover:shadow-xl sm:hover:rounded-md ${
     darkTheme ? "hover:bg-gray-950 border-gray-700" : "border-gray-200"
   } overflow-y-auto`}
    >
      {children}
    </section>
  );
}

export default CardContainer;
