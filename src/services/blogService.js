import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchBlogs = async (subcategoryId = null, searchQuery = "") => {
  console.log(searchQuery);
  const blogQuery = collection(db, "blogs");
  const querySnapshot = await getDocs(blogQuery);
  let blogs = [];
  querySnapshot.forEach((doc) => {
    const blog = { id: doc.id, ...doc.data() };
    console.log("Blog title:", blog.title);
    console.log("Blog content:", blog.summary);
    blogs.push({ id: doc.id, ...doc.data() });
  });

  if (subcategoryId) {
    blogs = blogs.filter((blog) =>
      blog.subcategories.some((subcategory) => subcategory.id === subcategoryId)
    );
  }

  if (searchQuery) {
    blogs = blogs.filter((blog) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = blog.title?.toLowerCase().includes(query);
      console.log(titleMatch);
      const contentMatch = blog.summary?.toLowerCase().includes(query);
      console.log(contentMatch);
      return titleMatch || contentMatch;
    });
    console.log("Filtered Blogs:", blogs);
  }

  return blogs;
};
