import React from "react";
import { getCategories } from "@/app/page";

export default async function CategoryList({ categories }) {
  const hey = await getCategories();

  return (
    <div
      className={`${
        filter ? "block" : "hidden"
      }  absolute left-0 rounded-md -bottom-10  w-full bg-white z-50 shadow-md p-2 h-50`}
    >
      asd
    </div>
  );
}
