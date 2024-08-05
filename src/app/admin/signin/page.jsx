"use client";
import React from "react";

import AuthLayout from "@/app/layouts/AuthLayout";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/firebase/firebase";

// To Navigate to a different page
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useState, useEffect } from "react";
function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signInUser, setSignInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setLoading(true);
          setSignInUser(user);
          // Fetch the user's document from the 'users' collection
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          // Check the user's role
          if (userSnapshot.exists()) {
            if (userSnapshot.data().role === "admin") {
              // Redirect the user to the admin dashboard if they are an admin
              router.push("/admin/dashboard");
            } else {
              // Sign out and redirect the user if they are not an admin
              await signOut(auth);
              router.push("/");
            }
          }
        }
      });

      // Check if the user is already authenticated and has an admin role when the component is mounted
      if (signInUser) {
        const userDoc = doc(db, "users", signInUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists() && userSnapshot.data().role === "admin") {
          router.push("/admin/dashboard");
        }
        setLoading(false);      
      }

      // Clean up the onAuthStateChanged listener when the component is unmounted
      return unsubscribe;
    };

    checkUser();
  }, []);

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setLoading(true);
      const userObj = {
        name: result.user.displayName,
        photo: result.user.photoURL,
        token: result.user.accessToken,
        uid: result.user.uid,
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(userObj));
      }
      dispatch(setUser(userObj));
    } catch (error) {
      setMessage("Oops! Something went wrong.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <AuthLayout>
      <section className="whitespace-nowrap mb-10">
        <div className="header text-center mb-10 text-[22px] border-b-2 border-black">
          <h1 className="header__logo">
            HELLO, <span className="logo__world">WORLD!</span>
          </h1>
        </div>
        <h1 className="text-[20px]  text-center">Admin</h1>
        <div
          onClick={handleGoogleSignin}
          className="mt-10 gap-2 flex items-center border p-2 w-[250px] border-gray-500 cursor-pointer hover:scale-105 transition-transform duration-400 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            id="google"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <p className="text-center flex-1">Sign in with Google</p>
        </div>
      </section>
      {/* <section className="text-center">{message}</section> */}
    </AuthLayout>
  );
}

export default Signin;
