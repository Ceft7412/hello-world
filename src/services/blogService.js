import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchBlogs = async () => {
  const blogsCollection = collection(db, "blogs");
  const blogsSnapshot = await getDocs(blogsCollection);
  const blogsList = blogsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return blogsList;
};
