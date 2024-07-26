"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from "@/firebase/firebase";
function SignInGoogle({ isShow }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <span
      className={`mr-4 cursor-pointer`}
      onClick={!isShow ? handleLogout : handleGoogleSignUp}
    >
      {!isShow ? "Logout" : "Signin"}
    </span>
  );
}

export default SignInGoogle;
