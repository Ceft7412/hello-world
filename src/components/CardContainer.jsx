"use client";
import React from "react";
import { useSelector } from "react-redux";

function CardContainer({ children }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <section
      className={`border-b-[3px] h-60 cursor-pointer hover:scale-105
   transition-transform duration-[220ms] px-6 py-2 hover:shadow-xl hover:rounded-md ${
     darkTheme ? "hover:bg-gray-950 border-gray-700" : "border-gray-200"
   }`}
    >
      {children}
    </section>
  );
}

export default CardContainer;
