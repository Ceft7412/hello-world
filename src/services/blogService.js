import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";

export const fetchBlogs = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const blogs = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ id: doc.id, ...doc.data() });
  });
  return blogs;
};
export const fetchCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
