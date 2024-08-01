"use client";
import React from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { fetchBlogs } from "@/services/blogService";
import { useSelector } from "react-redux";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

function Filter({ categories }) {
  const [showModal, setShowModal] = React.useState(false);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [filter, setFilter] = React.useState(false);

  const handleSubcategoryClick = (subcategory) => {
    router.push(`/?filter=${subcategory}`);
  };

  return (
    <div className="relative">
      <div
        className={`ring-1  h-10 text-gray-600 p-1 px-2 flex justify-between items-center rounded-xl w-[220px]  cursor-pointer text-black ${
          darkTheme
            ? "bg-gray-950 text-white ring-gray-950 "
            : "bg-gray-200 ring-gray-300 "
        }`}
        onClick={() => setFilter(!filter)}
      >
        <span className="first-item">{categories[0].name}</span>
        <KeyboardArrowDownRoundedIcon />
      </div>
      <div
        className={`${
          filter ? "block" : "hidden"
        }  absolute left-0 rounded-md  w-full bg-white z-50 ring-1 ring-black ring-opacity-5  shadow-lg h-50`}
      >
        <div className="flex flex-col">
          {categories.map((category) => (
            <div
              onMouseEnter={() => setShowModal(category.id)}
              onMouseLeave={() => setShowModal(null)}
              className="relative p-2 hover:bg-gray-200 flex justify-between text-gray-700 text-sm"
              key={category.id}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightRoundedIcon />
              )}
              {showModal === category.id && category.subcategories.length > 0 && (
                <div className="absolute  left-full -top-1 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {category.subcategories.map((subcategory) => (
                      <a
                        key={subcategory.id}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => handleSubcategoryClick(subcategory.id)}
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
