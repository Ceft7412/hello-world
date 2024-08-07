"use client";
import React from "react";
import { useSelector } from "react-redux";

const ModalCenter = ({ isOpen, onClose, onConfirm, title, message }) => {
  const themeColor = useSelector((state) => state.theme.themeColor);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className={`${
          themeColor === "dark" ? "bg-gray-900" : "bg-white"
        } p-6 rounded-md shadow-md w-11/12 max-w-md`}
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCenter;
