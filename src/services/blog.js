import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // assuming you have a db export in firebaseConfig file

export async function incrementBlogLikes(blogId, userId) {
  const blogRef = doc(db, "blogs", blogId);

  // Atomically add a new region to the "likes" array field.
  await updateDoc(blogRef, {
    likes: arrayUnion(userId),
  });
}

export async function decrementBlogLikes(blogId, userId) {
  const blogRef = doc(db, "blogs", blogId);

  // Atomically remove a region from the "likes" array field.
  await updateDoc(blogRef, {
    likes: arrayRemove(userId),
  });
}
