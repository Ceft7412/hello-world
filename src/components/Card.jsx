"use client";
import Link from "next/link";
import Category from "@/components/Category";
import Empty from "./Empty";
import CardContainer from "./CardContainer";
import { slugify } from "@/utils/slugify";

export default function Card({ darkTheme, blogs }) {
  if (!blogs.length) {
    return <Empty>No results found.</Empty>;
  }
  return (
    <>
      {blogs.map((blog) => (
        <CardContainer key={blog.id}>
          <div className="flex gap-5">
            {blog.subcategories.map((cat) => (
              <Category key={cat.id}>{cat.name}</Category>
            ))}
          </div>
          <h1 className="mb-5 text-2xl">{blog.title}</h1>
          <p className="h-17 line-clamp-2">{blog.summary}</p>
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
