"use client";
import React from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { openModal, closeModal, setModalName } from "@/redux/modalSlice";
import FilterModal from "./Modals/FilterModal";

function Filter({ categories }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const themeColor = useSelector((state) => state.theme.themeColor);
  const nameModal = useSelector((state) => state.modal.nameModal);
  const modalShow = useSelector((state) => state.modal.modalShow);
  const [textDisplay, setTextDisplay] = React.useState("All Categories");
  const [hasQueryParams, setHasQueryParams] = useState(false);

  const clearFilters = () => {
    // Create a new URL object with the current window location
    const url = new URL(window.location);
    // Clear all query parameters
    url.search = "";
    // Navigate to the new URL
    router.push(url.toString());
    // Reset the displayed text
    setTextDisplay("All Categories");
    setHasQueryParams(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <div className="flex flex-col-reverse sm:flex-row gap-2 w-full ">
        <div
          className={`w-full sm:w-48 h-10 text-gray-600 p-1 px-2 flex justify-between items-center rounded-xl w-[220px]  cursor-pointer text-black ${
            themeColor === "dark" ? "text-white  " : " "
          }`}
          onClick={(event) => {
            if (!modalShow) {
              event.stopPropagation();
            }
            if (nameModal !== "filter-modal") {
              dispatch(openModal("filter-modal"));
            } else {
              dispatch(closeModal());
            }
          }}
        >
          <span className="first-item">{textDisplay}</span>
          <KeyboardArrowDownRoundedIcon
            className={`${
              nameModal === "filter-modal" ? "transform rotate-180" : ""
            } transition-transform duration-300`}
          />
        </div>
        {hasQueryParams && (
          <button
            className="transition-colors duration-500 clear-button flex self-end items-center gap-1 p-2 hover:bg-gray-100 rounded-xl hover:text-black text-gray-500"
            onClick={clearFilters}
          >
            <HighlightOffRoundedIcon />
            Clear
          </button>
        )}
      </div>
      <FilterModal
        setHasQueryParams={setHasQueryParams}
        setTextDisplay={setTextDisplay}
        categories={categories}
      />
    </div>
  );
}

export default Filter;
