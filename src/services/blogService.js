import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchBlogs = async (
  subcategoryId = null,
  searchQuery = "",
  filterCategory = null
) => {
  const blogsCollection = collection(db, "blogs");
  const documents = await getDocs(blogsCollection);
  let blogs = [];

  documents.forEach((doc) => {
    const data = doc.data();
    // Check if the date field exists and is a Firestore Timestamp
    if (data.date && data.date instanceof Timestamp) {
      // Convert the Timestamp to a JavaScript Date object
      data.date = new Date(data.date.seconds * 1000);
    }
    blogs.push({ id: doc.id, ...data });
  });

  if (filterCategory) {
    blogs = blogs.filter((blog) => blog.category.id === filterCategory);
  }

  if (subcategoryId) {
    blogs = blogs.filter((blog) =>
      blog.subcategories.some((subcategory) => subcategory.id === subcategoryId)
    );
  }

  if (searchQuery) {
    blogs = blogs.filter((blog) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = blog.title?.toLowerCase().includes(query);
      const contentMatch = blog.summary?.toLowerCase().includes(query);

      return titleMatch || contentMatch;
    });
  }

  return blogs;
};
