"use client";

import { useEffect, useState } from "react";
import { fetchBlogs } from "@/services/blogService";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import Loader from "@/components/Loader";
export default function Home() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  // To hold the blogs data coming from the database
  const [blogs, setBlogs] = useState([]);

  // Loading state in case the data fetching is too long
  const [loading, setLoading] = useState(true);

  // When the page mounts the effect will perform
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className="home self-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-20 ">
        {blogs.length === 0 ? (
          <p>No blog posts available</p>
        ) : (
          blogs.map((blog) => (
            <section key={blog.id} className="border-b-[3px] h-60">
              <div className="flex gap-5">
                {blog.category.map((cat, index) => (
                  <h2
                    key={index}
                    className={`${
                      darkTheme ? "bg-white text-black" : " bg-gray-950 text-white"
                    }  p-1 px-2 rounded mb-8`}
                  >
                    {cat}
                  </h2>
                ))}
              </div>
              <h1 className="mb-5 text-2xl">{blog.title}</h1>
              <p className="h-17  line-clamp-2">
                {blog.summary}operations operations operations operations operations
                operations operations operations operations operations operations
                operations operations operations operations operations op erations
                operations operations operations operations operations operations
                operations operations operations operations operations operations
                operations operations operations operations operations operations
                operations
              </p>
            </section>
          ))
        )}
      </div>
    </MainLayout>
  );
}
