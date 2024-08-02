"use client";
import React from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { fetchBlogs } from "@/services/blogService";
import { useSelector } from "react-redux";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Filter({ categories }) {
  const [showModal, setShowModal] = React.useState(false);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [textDisplay, setTextDisplay] = React.useState("All Categories");
  const [filter, setFilter] = React.useState(false);
  const router = useRouter();
  const [hasQueryParams, setHasQueryParams] = useState(false);
  // To check if the URL has query parameters

  const handleCategoryClick = (category, categoryName) => {
    // Creates a new URL object with the current window location.
    // This is done to update the URL query parameters by appending it if search query is present.
    const url = new URL(window.location);
    // Sets the filter query parameter to the selected category
    url.searchParams.set("category", category);
    // Navigates to the new URL
    router.push(url.toString());
    // Closes the filter dropdown
    setFilter(false);
    setTextDisplay(categoryName);
    setHasQueryParams(true);
  };
  const handleSubcategoryClick = (subcategory, categoryName) => {
    // Creates a new URL object with the current window location.
    // This is done to update the URL query parameters by appending it if search query is present.
    const url = new URL(window.location);
    // Sets the filter query parameter to the selected subcategory
    url.searchParams.set("filter", subcategory);
    // Navigates to the new URL
    router.push(url.toString());
    // Closes the filter dropdown
    setFilter(false);
    setTextDisplay(categoryName);
    setHasQueryParams(true);
  };

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
          className={`w-full sm:w-48 ring-1  h-10 text-gray-600 p-1 px-2 flex justify-between items-center rounded-xl w-[220px]  cursor-pointer text-black ${
            darkTheme
              ? "bg-gray-950 text-white ring-gray-950 "
              : "bg-gray-200 ring-gray-300 "
          }`}
          onClick={() => setFilter(!filter)}
        >
          <span className="first-item">{textDisplay}</span>
          <KeyboardArrowDownRoundedIcon
            className={`${
              filter ? "transform rotate-180" : ""
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
      <div
        className={`${
          filter ? "block" : "hidden"
        }  absolute left-0 rounded-md  w-full sm:w-48 bg-white z-10      ring-1 ring-black ring-opacity-5  shadow-lg h-50`}
      >
        <div
          className={`flex flex-col ${
            darkTheme ? "bg-gray-950" : "bg-white text-gray-700"
          }`}
        >
          {categories.map((category) => (
            <div
              onMouseEnter={() => setShowModal(category.id)}
              onMouseLeave={() => setShowModal(null)}
              className={`${
                darkTheme ? "hover:bg-gray-900" : " hover:bg-gray-200"
              } relative flex flex-col sm:justify-between text-sm`}
              key={category.id}
            >
              <div className="w-full sm:w-auto flex p-2 justify-between">
                <span
                  className="flex-1"
                  onClick={() => handleCategoryClick(category.id, category.name)}
                >
                  {category.name}
                </span>
                {category.subcategories && category.subcategories.length > 0 && (
                  <>
                    <ChevronRightRoundedIcon className="hidden sm:block" />
                    <ExpandMoreRoundedIcon
                      className={`block sm:hidden transition-transform duration-500 ${
                        showModal === category.id ? "transform rotate-180" : ""
                      }`}
                      onClick={() => setShowModal(category.id)}
                    />
                  </>
                )}
              </div>
              {showModal === category.id && category.subcategories.length > 0 && (
                <div
                  className={`${
                    darkTheme ? "bg-gray-950" : "bg-white text-gray-700"
                  } w-full sm:w-48 sm:absolute sm:left-full sm:-top-1 sm:mt-2  sm:rounded-md sm:shadow-lg sm:ring-1 sm:ring-black sm:ring-opacity-5`}
                >
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {category.subcategories.map((subcategory) => (
                      <a
                        key={subcategory.id}
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          darkTheme ? "hover:bg-gray-900" : "hover:bg-gray-100"
                        } `}
                        role="menuitem"
                        onClick={() =>
                          handleSubcategoryClick(subcategory.id, category.name)
                        }
                      >
                        {subcategory.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
