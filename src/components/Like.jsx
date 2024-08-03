"use client";
import React, { useState, useEffect } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { decrementBlogLikes, incrementBlogLikes } from "@/services/blog";
import { incrementLikes, decrementLikes } from "@/redux/likesSlice";
import { useDispatch } from "react-redux";
import { auth } from "@/firebase/firebase";

export default function Like({ blog }) {
  const dispatch = useDispatch();   
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes.length);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setLiked(blog.likes.includes(user.uid));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [blog.likes]);

  const handleLike = async () => {
    if (!user) {
      setError("You must be logged in to like a blog.");
      return;
    }

    try {
      if (!liked) {
        await incrementBlogLikes(blog.id, user.uid);
        dispatch(incrementLikes());
        setLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        await decrementBlogLikes(blog.id, user.uid);
        dispatch(decrementLikes());
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {liked ? (
        <FavoriteRoundedIcon
          className="cursor-pointer text-[40px]"
          onClick={handleLike}
        />
      ) : (
        <FavoriteBorderRoundedIcon
          className="cursor-pointer text-[40px]"
          onClick={handleLike}
        />
      )}
      {error ? (
        <p className="fixed bottom-20 z-50 bg-red-500 font-medium p-4 w-[350px] text-center text-white rounded-md ">
          {error}
        </p>
      ) : null}
    </>
  );
}
