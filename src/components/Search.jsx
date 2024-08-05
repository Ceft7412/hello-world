"use client";
import React from "react";
import { useSelector } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const themeColor = useSelector((state) => state.theme.themeColor);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    // Creates a new URL object with the current window location.
    // This is done to update the URL query parameters by appending
    // it if filter by subcategory query is present.
    const url = new URL(window.location);

    if (searchQuery.trim()) {
      // Sets the search query parameter to the entered search query
      url.searchParams.set("search", searchQuery.trim());
    } else {
      // Deletes the search query parameter if the search query is empty.
      url.searchParams.delete("search");
    }
    router.push(url.toString());
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative text-black w-full sm:w-auto self-end"
    >
      <SearchRoundedIcon
        onClick={handleSearch}
        className="absolute right-1 top-[3px] text-[35px] text-gray-600 cursor-pointer hover:bg-gray-200 p-1 rounded-full"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search blogs..."
        className={`w-full sm:w-auto p-1 px-2 pr-10 h-10 w-[250px] border-b-2 outline-none ${
          themeColor === "dark"
            ? "bg-[#1a202c] text-white border-gray-700"
            : "text-black border-gray-400"
        }`}
      />
    </form>
  );
}

export default Search;
