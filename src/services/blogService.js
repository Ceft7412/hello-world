import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchBlogs = async (subcategoryId = null) => {
  const blogQuery = collection(db, "blogs");
  const querySnapshot = await getDocs(blogQuery);
  let blogs = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ id: doc.id, ...doc.data() });
  });

  if (subcategoryId) {
    blogs = blogs.filter((blog) =>
      blog.subcategories.some((subcategory) => subcategory.id === subcategoryId)
    );
  }

  return blogs;
};
