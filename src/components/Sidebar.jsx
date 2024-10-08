"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive } from "@/redux/activeSlice";
import { useRouter } from "next/navigation";

export default function Sidebar({ currentRoute }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.theme.themeColor);

  const handleOnClick = (set) => {
    set === "newblog"
      ? dispatch(setActive("newblog")) && router.push("/admin/newblog")
      : dispatch(setActive("allblogs")) && router.push("/admin/allblogs");
  };
  return (
    <section
      className={`mt-[50px] fixed top-0  w-full z-50 sm:left-0 sm:bottom-0  sm:w-[200px]  ${
        themeColor === "dark" ? "bg-gray-950" : "bg-white border-r "
      }`}
    >
      <ul
        className={`bg-black/[0.1] sm:bg-transparent sm:mt-5 text-[16px] sm:px-2 flex justify-around sm:flex-col gap-1 ${
          themeColor === "dark" ? "text-gray-300" : "text-gray-700  "
        }`}
      >
        <li
          className={`p-1 transition-colors duration-300 sm:rounded-md ${
            currentRoute === "allblogs"
              ? "bg-gray-500/[0.1] cursor-default"
              : "cursor-pointer hover:bg-gray-500/[0.1]"
          }`}
          onClick={() => handleOnClick("allblogs")}
        >
          All Blogs
        </li>

        <li
          className={`p-1 transition-colors duration-300 sm:rounded-md ${
            currentRoute === "newblog"
              ? "bg-gray-500/[0.1] cursor-default"
              : "cursor-pointer hover:bg-gray-500/[0.1]"
          }`}
          onClick={() => handleOnClick("newblog")}
        >
          New Blog
        </li>
      </ul>
    </section>
  );
}
