"use client";
import React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { addComment as addCommentToDb } from "@/services/blog";

function Comment({ blog }) {
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const addComment = async (event) => {
    // Make this function async
    event.preventDefault();
    setNewComment("");
    if (!user) {
      alert("You must be logged in to add a comment.");
      return;
    }

    // Call the imported function
    await addCommentToDb(
      blog.id,
      newComment,
      user.uid,
      user.reloadUserInfo.photoUrl,
      user.email,
      user.displayName
    );

    setNewComment("");
  };

  return (
    <section className="mb-20 mt-10 ">
      <form onSubmit={addComment} className="flex flex-col gap-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="border p-2 w-full resize-none h-32 rounded-md"
        />
        <div className="self-end flex gap-5">
          <button className="p-2 hover:bg-gray-200 rounded-md" type="button">
            Cancel
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-md" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default Comment;
