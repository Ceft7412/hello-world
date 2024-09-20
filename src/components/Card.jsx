"use client";
import Link from "next/link";
import Category from "@/components/Category";
import Empty from "./Empty";
import { slugify } from "@/utils/slugify";
import { useSelector } from "react-redux";
export default function Card({ darkTheme, blogs }) {
  if (!blogs.length) {
    return <Empty>No results found.</Empty>;
  }
  return (
    <>
      {blogs.map((blog) => (
        <CardContainer key={blog.id}>   
          <div className="flex gap-5">
            {blog.subcategories.map((cat, index) => (
              <Category key={index}>{cat.name}</Category>
            ))}
          </div>
          <h1 className="mb-5 text-2xl font-medium">{blog.title}</h1>
          <p className="h-17 line-clamp-2 text-[15px]" title={blog.summary}>
            {blog.summary}
          </p>
          <Link href={`/blog/${slugify(blog.title)}`}>
            <button
              type="button"
              className="py-2 mt-2 text-blue-600 font-medium underline "
            >
              Read more
            </button>
          </Link>
        </CardContainer>
      ))}
    </>
  );
}

function CardContainer({ children }) {
  const themeColor = useSelector((state) => state.theme.themeColor);
  return (
    <section
      className={`border-b-[3px] sm:h-70 sm:hover:scale-105
   transition-transform duration-[220ms] px-2 sm:px-6 py-2 sm:hover:shadow-xl sm:hover:rounded-md ${
     themeColor === "dark" ? "sm:hover:bg-gray-950 border-gray-700" : "border-gray-200"
   } overflow-y-auto`}
    >
      {children}
    </section>
  );
}

export { CardContainer };
