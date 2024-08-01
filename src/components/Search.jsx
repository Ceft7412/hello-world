"use client";
import React from "react";
import { useSelector } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
function Search() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <div className="self-end relative text-black ">
      <SearchRoundedIcon
        className={`absolute right-1 top-[3px] text-[35px] text-gray-600 cursor-pointer hover:bg-gray-200 p-1 rounded-full  `}
      />
      <input
        type="text"
        placeholder="Search blogs..."
        className={`p-1 px-2 pr-10 h-10 w-[250px]  border outline-none rounded-xl ${
          darkTheme
            ? "bg-gray-950 text-white border-gray-700"
            : "bg-gray-200 text-black border-gray-400"
        }`}
      />
    </div>
  );
}

export default Search;
