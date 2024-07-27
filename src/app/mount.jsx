"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/authSlice";
import { auth } from "@/firebase/firebase";
export default function Mounth({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(setUser(user));
      } else {
        // User is signed out
        dispatch(setUser(null));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
  return <>{children}</>;
}
