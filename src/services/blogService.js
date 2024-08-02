import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Using async because it takes time to fetch data from the database
// It will perform the task in the background without blocking the main thread
export const fetchBlogs = async (
  subcategoryId = null,
  searchQuery = "",
  filterCategory = null
) => {
  // Fetches all blogs from the database collection
  const blogsCollection = collection(db, "blogs");
  // Fetches all documents from the blogs collection
  const documents = await getDocs(blogsCollection);
  let blogs = []; 

  // Iterates over each blog document in the collection
  documents.forEach((doc) => {
    // Adds the blog id and data to the blogs array
    // The ...doc.data() is used to spread the blog data into the object
    // For example: { id: doc.id, title: doc.data().title, summary: doc.data().summary }
    // This is done to avoid nested objects in the blogs array.
    // For example if you don't use spread operator, the blogs array will look like:
    // [{ id: doc.id, data: { title: doc.data().title, summary: doc.data().summary, subcategories: [Object] } }]
    blogs.push({ id: doc.id, ...doc.data() });
  });

  // Filters the blogs based on the filter category
  if (filterCategory) {
    blogs = blogs.filter(
      (blog) =>
        // Checks if the blog's category id matches the filterCategory
        blog.category.id === filterCategory
    );
  }

  if (subcategoryId) {
    blogs = blogs.filter((blog) =>
      // Checks if the blog has the subcategory id in its subcategories array
      blog.subcategories.some((subcategory) => subcategory.id === subcategoryId)
    );
  }

  if (searchQuery) {
    blogs = blogs.filter((blog) => {
      // Converts the search query to lowercase
      const query = searchQuery.toLowerCase();

      // Checks if the blog title or content includes the search query
      // The ? is used to handle the case where the blog title or summary is null from the database.
      // For example if blog.title is null, then titleMatch will be false and vice versa.
      const titleMatch = blog.title?.toLowerCase().includes(query);
      const contentMatch = blog.summary?.toLowerCase().includes(query);

      // Returns true if either the title or content includes the search query
      return titleMatch || contentMatch;
    });
  }

  return blogs;
};
