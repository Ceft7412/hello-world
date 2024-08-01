"use client";
import { fetchBlogs } from "@/services/blogService";
import Category from "@/components/Category";
import Empty from "./Empty";
import CardContainer from "./CardContainer";
import { useEffect, useState } from "react";

export default function Card({ darkTheme, blogs }) {
  const [arg, setArg] = useState("nextjs");

  const filteredBlogs = blogs.filter((blog) =>
    blog.subcategories.some((subcategory) => subcategory.id === arg)
  );

  return (
    <>
      {filteredBlogs.map((blog) => (
        <CardContainer key={blog.id}>
          <div className="flex gap-5">
            {blog.subcategories.map((cat) => (
              <Category key={cat.id}>{cat.name}</Category>
            ))}
          </div>
          <h1 className="mb-5 text-2xl">{blog.title}</h1>
          <p className="h-17 line-clamp-2">{blog.summary}</p>
        </CardContainer>
      ))}
    </>
  );
}
