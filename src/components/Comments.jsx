"use client";
import React from "react";
import { getComments } from "@/services/blog";

export default function Comments({ blog }) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(blog.id);
      setComments(comments);
    };

    fetchComments();
  }, [blog.id]);

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>
            {comment.userName}: {comment.text}
          </p>
        </div>
      ))}
    </div>
  );
}
