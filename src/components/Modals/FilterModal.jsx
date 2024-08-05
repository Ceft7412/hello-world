"use client";
import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Router
import { useRouter } from "next/navigation";
import { closeModal } from "@/redux/modalSlice";

// Icons
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export default function FilterModal({ setHasQueryParams, setTextDisplay, categories }) {
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.theme.themeColor);
  const nameModal = useSelector((state) => state.modal.nameModal);
  const modalShow = useSelector((state) => state.modal.modalShow);
  const [showModal, setShowModal] = React.useState(false);
  console.log(showModal);
  const router = useRouter();

  const handleCategoryClick = (category, categoryName) => {
    // Creates a new URL object with the current window location.
    // This is done to update the URL query parameters by appending it if search query is present.
    const url = new URL(window.location);
    // Sets the filter query parameter to the selected category
    url.searchParams.set("category", category);
    // Navigates to the new URL
    router.push(url.toString());
    // Closes the filter dropdown
    dispatch(closeModal());
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
    dispatch(closeModal());
    setShowModal(false);
    setTextDisplay(categoryName);
    setHasQueryParams(true);
  };

  return (
    modalShow &&
    nameModal === "filter-modal" && (
      <div
        className={`absolute left-15 top-15 rounded-md w-full sm:w-48 bg-white z-10 ring-1 ring-black ring-opacity-5 shadow-lg h-50`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`flex flex-col ${
            themeColor === "dark" ? "bg-gray-950" : "bg-white text-gray-700"
          }`}
        >
          {categories.map((category) => (
            <div
              onMouseEnter={() => setShowModal(category.id)}
              onMouseLeave={() => setShowModal(null)}
              className={`${
                themeColor === "dark" ? "hover:bg-gray-900" : " hover:bg-gray-200"
              } relative flex flex-col sm:justify-between text-sm`}
              key={category.id}
            >
              <div className="w-full sm:w-auto flex p-2 justify-between">
                <span
                  className="flex-1 cursor-default"
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
                      onClick={() => {
                        if (showModal === category.id) {
                          setShowModal("");
                        } else {
                          setShowModal(category.id);
                        }
                      }}
                    />
                  </>
                )}
              </div>
              {showModal === category.id && category.subcategories.length > 0 && (
                <div
                  className={`${
                    themeColor === "dark" ? "bg-gray-950" : "bg-white text-gray-700"
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
                          themeColor === "dark"
                            ? "hover:bg-gray-900"
                            : "hover:bg-gray-100"
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
    )
  );
}
