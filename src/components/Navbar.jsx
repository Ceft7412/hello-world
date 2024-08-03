"use client";
import React, { useState, useEffect } from "react";

// Icons
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

// Redux
import { toggleTheme, setTheme } from "@/redux/themeSlice";
import { openModal, closeModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "@/firebase/firebase";
import { setUser } from "@/redux/authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";

import ProfileModal from "./Modals/ProfileModal";

function Navbar({ setMessage, setIsUser, setLogoutMessage }) {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const user = useSelector((state) => state.auth.user);
  const nameModal = useSelector((state) => state.modal.nameModal);
  const modalShow = useSelector((state) => state.modal.modalShow);
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load the theme before the application starts
  useEffect(() => {
    // Load the theme before the application starts
    if (typeof window !== "undefined") {
      const savedDarkTheme = JSON.parse(window.localStorage.getItem("darkTheme"));
      if (savedDarkTheme !== null) {
        dispatch(setTheme(savedDarkTheme));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user) {
        setIsLogin(true);
        dispatch(setUser(user));
      }
    }
  }, []);

  useEffect(() => {
    document.body.className = darkTheme ? "darkTheme" : "";
  }, [darkTheme]);

  const handleTheme = () => {
    dispatch(toggleTheme());
    const currentTheme = darkTheme ? false : true;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("darkTheme", JSON.stringify(currentTheme));
    }
  };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const userObj = {
        name: result.user.displayName,
        photo: result.user.photoURL,
        token: result.user.accessToken,
        uid: result.user.uid,
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(userObj));
      }
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If the user doesn't exist, create a new document with the user's ID as the document ID
        await setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: "user",
        });
      }
      setMessage(true);
      setIsUser(userObj);
      setIsLogin(true);
      setIsModalOpen(false);
      dispatch(setUser(userObj));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={`header ${
        darkTheme ? "bg-gray-950 shadow-xl" : "shadow bg-white"
      } fixed  z-20 top-0 left-0 right-0 h-[50px] min-w-80`}
    >
      <div className="header__flex  relative flex  w-full h-full justify-between items-center p-2 sm:px-16">
        <div className="header__logo sm:absolute sm:left-[50%] sm:-translate-x-2/4 text-[20px]  whitespace-nowrap">
          <Link href="/">
            HELLO, <span className="logo__world">WORLD!</span>
          </Link>
        </div>

        <nav className="header__nav-links ml-auto flex items-center gap-2">
          <div className="mr-6 flex items-center gap-5 ">
            {isLogin && (
              <div className="relative">
                <div
                  onClick={(event) => {
                    if (!modalShow) {
                      event.stopPropagation();
                    }
                    if (nameModal !== "profile-modal") {
                      dispatch(openModal("profile-modal"));
                    } else {
                      dispatch(closeModal());
                    }
                  }}
                  className="active:scale-105 cursor-pointer"
                >
                  <Image
                    className="rounded-full"
                    src={user.photo}
                    alt={`${user.displayName} profile picture`}
                    width={40}
                    height={40}
                  />
                  <ExpandMoreRoundedIcon
                    style={{ fontSize: ".9rem" }}
                    className={`absolute bg-gray-300  ${
                      darkTheme ? "bg-gray-900" : ""
                    } rounded-full text-[12px] right-[1px] bottom-0`}
                  />
                  <ProfileModal
                    user={user}
                    setIsLogin={setIsLogin}
                    setLogoutMessage={setLogoutMessage}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <span className="cursor-pointer" onClick={signInWithGoogle}>
                Sign in
              </span>
            )}
          </div>
          <WbSunnyRoundedIcon
            className={`cursor-pointer transition-colors duration-300 ease-in-out  active:scale-105 hover:text-violet-900`}
            onClick={() => handleTheme()}
          />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
