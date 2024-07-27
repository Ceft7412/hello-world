import React from "react";
import { fetchBlogs } from "@/services/blogService";
import Category from "@/components/Category";
import Empty from "./Empty";

export default async function Card() {
  let blogs = [];
  try {
    blogs = await fetchBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <>
      {blogs.length === 0 ? (
        <Empty>No blog posts yet available.</Empty>
      ) : (
        blogs.map((blog) => (
          <section key={blog.id} className="border-b-[3px] h-60">
            <div className="flex gap-5">
              {blog.category.map((cat, index) => (
                <Category key={index}>{cat}</Category>
              ))}
            </div>
            <h1 className="mb-5 text-2xl">{blog.title}</h1>
            <p className="h-17 line-clamp-2">{blog.summary}</p>
          </section>
        ))
      )}
    </>
  );
}
