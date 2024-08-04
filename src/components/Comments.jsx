"use client";
import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { auth } from "@/firebase/firebase";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
export default function Comments({ blog }) {
  const [comments, setComments] = React.useState([]);
  const [user, setUser] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const commentsRef = collection(db, "blogs", blog.id, "comments");
    const q = query(commentsRef, orderBy("timestamp", "desc")); // Order by timestamp in ascending order
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(newComments);
    });
    return () => unsubscribe();
  }, [blog.id]);

  const confirmation = (commentId) => {
    setConfirmationMessage(true);
  };
  const deleteComment = async (commentId) => {
    // Delete the comment with the given id
    // Get the reference to the comment document
    const commentRef = doc(db, "blogs", blog.id, "comments", commentId);
    // Delete the comment
    await deleteDoc(commentRef);
    setConfirmationMessage(false);
  };
  return (
    <div>
      <h2 className="text-[22px] mb-10">Comments</h2>
      <div className="flex flex-col gap-10">
        {comments.map((comment) => (
          <div key={comment.id} className="flex sm:gap-10">
            <div className="mr-6 sm:mr-0">
              <img
                src={comment.userPhoto}
                alt={comment.userName}
                className="w-12 h-10 sm:w-10 rounded-full "
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col">
                <div className="flex justify-between w-full">
                  <span className="text-[18px]">{comment.userName}</span>
                  {user && user.uid === comment.userId && (
                    <DeleteRoundedIcon
                      className="cursor-pointer"
                      onClick={confirmation}
                    />
                  )}
                  {confirmationMessage && (
                    <div
                      className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-50 bg-gray-1/2"
                      onClick={() => setConfirmationMessage("")}
                    >
                      <div
                        className="w-[300px] sm:w-[400px] p-2 rounded-md bg-white border text-black"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="heading-modal flex justify-end w-full mb-2">
                          <CloseRoundedIcon
                            className="p-1 hover:bg-gray-100 rounded-full text-[30px] cursor-pointer"
                            onClick={() => setConfirmationMessage(false)}
                          />
                        </div>
                        <div className="body-modal px-4">
                          <h2 className="text-center text-[25px] font-bold mb-2">
                            Are you sure?
                          </h2>
                          <p className="text-center text-[15px]">
                            Are you sure you want to delete this comment? This action
                            cannot be undone.
                          </p>
                        </div>
                        <div className="footer-modal flex gap-2 items-center justify-center mt-6 mb-6">
                          <button
                            type="button"
                            className="w-[150px] rounded-md border-2 border-black p-2 hover:bg-gray-100"
                            onClick={() => setConfirmationMessage(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="text-white w-[150px] rounded-md  border border-red-500 bg-red-500 p-2 hover:bg-red-600"
                            onClick={() => deleteComment(comment.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[15px] text-gray-500 font-thin">
                  {comment.timestamp &&
                    comment.timestamp.toDate().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </div>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
