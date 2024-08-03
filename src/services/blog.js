import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
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

export async function addComment(
  blogId,
  comment,
  userId,
  userPhoto,
  userEmail,
  userName
) {
  const commentsRef = collection(db, "blogs", blogId, "comments");

  // Add a new comment document to the "comments" subcollection.
  await addDoc(commentsRef, {
    text: comment,
    timestamp: serverTimestamp(),
    userId: userId,
    userPhoto: userPhoto,
    userEmail: userEmail,
    userName: userName,
  });
}

export async function getComments(blogId) {
  const commentsRef = collection(db, "blogs", blogId, "comments");
  const commentSnapshots = await getDocs(commentsRef);
  const comments = commentSnapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return comments;
}
