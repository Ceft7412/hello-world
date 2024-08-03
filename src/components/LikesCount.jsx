"use client";

import React, { useEffect, useState } from "react";
import { setCountLikes } from "@/redux/likesSlice";
import { useSelector, useDispatch } from "react-redux";
function LikesCount({ blog }) {
  const dispatch = useDispatch();
  const likesCount = useSelector((state) => state.likes.likesCount);

  useEffect(() => {
    dispatch(setCountLikes(blog.likes.length));
  }, [blog.likes]);

  return (
    <span>
      {likesCount} {likesCount === 1 ? "like" : "likes"}
    </span>
  );
}

export default LikesCount;
