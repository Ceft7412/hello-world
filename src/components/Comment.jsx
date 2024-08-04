"use client";
import React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { addComment as addCommentToDb } from "@/services/blog";
import { useSelector } from "react-redux";
function Comment({ blog }) {
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userMessage) {
      const timer = setTimeout(() => {
        setUserMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userMessage]);

  const addComment = async (event) => {
    // Make this function async
    event.preventDefault();
    setNewComment("");
    if (!user) {
      setUserMessage("You must be logged in to add a comment.");
      return;
    }
    if (user && newComment.trim() === "") {
      setUserMessage("Comment cannot be empty.");
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
    <>
      <section className="mb-20 mt-10 ">
        <form onSubmit={addComment} className="flex flex-col gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={`${
              darkTheme ? "bg-[#1a202c]" : " "
            } border p-2 w-full resize-none h-32 rounded-md`}
          />
          <div className="self-end flex gap-5">
            {newComment && (
              <button
                className="p-2 hover:bg-gray-200 rounded-md hover:text-black"
                type="button"
                onClick={() => setNewComment("")}
              >
                Cancel
              </button>
            )}

            <button
              className="p-2 hover:bg-gray-200 rounded-md hover:text-black"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      {userMessage && (
        <section className="fixed bottom-16 sm:bottom-20 left-0 right-0 flex justify-center">
          <div className="text-center px-2 py-2 bg-red-500 text-white text-[15px] sm:text-[15px] rounded font-medium">
            {userMessage}
          </div>
        </section>
      )}
    </>
  );
}

export default Comment;
