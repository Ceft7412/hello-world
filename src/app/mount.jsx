"use client";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/authSlice";
import { auth, db } from "@/firebase/firebase";

export default function Mount({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {     
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          // Merge auth and Firestore user data
          const fullUser = {
            ...user,
            role: "users",
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
          };
          dispatch(setUser(fullUser));
        } else {
          // User document doesn't exist, just dispatch auth user data
          dispatch(setUser(user));
        }
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
