"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive } from "@/redux/activeSlice";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const active = useSelector((state) => state.active.active);
  const themeColor = useSelector((state) => state.theme.themeColor);

  useEffect(() => {
    // Set the active state based on the current route
    if (pathName) {
      const currentRoute = pathName.split("/")[2]; // Assuming your routes are in the format '/admin/{route}'
      dispatch(setActive(currentRoute));
    }
  }, [pathName]);
  const handleOnClick = (active) => {
    active === "new-blog"
      ? dispatch(setActive("new-blog")) && router.push("/admin/new-blog")
      : dispatch(setActive("all-blogs")) && router.push("/admin/all-blogs");
  };
  return (
    <section
      className={`hidden sm:block mt-[50px] fixed left-0 top-0 bottom-0 w-[200px]  ${
        themeColor === "dark" ? "bg-gray-950" : "bg-white border-r "
      }`}
    >
      <ul
        className={`mt-5 text-[16px] px-2 flex flex-col gap-1 ${
          themeColor === "dark" ? "text-gray-300" : "text-gray-700  "
        }`}
      >
        <li
          className={`p-1 transition-colors duration-300 rounded-md ${
            active === "all-blogs"
              ? "bg-gray-500/[0.1] cursor-default"
              : "cursor-pointer hover:bg-gray-500/[0.1]"
          }`}
          onClick={() => handleOnClick("all-blogs")}
        >
          All Blogs
        </li>

        <li
          className={`p-1 transition-colors duration-300 rounded-md ${
            active === "new-blog"
              ? "bg-gray-500/[0.1] cursor-default"
              : "cursor-pointer hover:bg-gray-500/[0.1]"
          }`}
          onClick={() => handleOnClick("new-blog")}
        >
          New Blog
        </li>
      </ul>
    </section>
  );
}
