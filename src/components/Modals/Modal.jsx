import React from "react";
import { useSelector } from "react-redux";
export default function Modal({ children }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const modalShow = useSelector((state) => state.modal.modalShow);
  return modalShow ? (
    <div
      className={`absolute left-20 top-20 rounded-md w-full sm:w-48 bg-white z-10 ring-1 ring-black ring-opacity-5 shadow-lg h-50`}
    >
      <div
        className={`flex flex-col ${
          darkTheme ? "bg-gray-950" : "bg-white text-gray-700"
        }`}
      >
        {children}
      </div>
    </div>
  ) : null;
}
