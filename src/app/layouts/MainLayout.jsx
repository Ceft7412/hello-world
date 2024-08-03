"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/modalSlice";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState(null);
  console.log(isUser);
  const [message, setMessage] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(null);
  console.log(message);

  useEffect(() => {
    if (message && isUser) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (logoutMessage && isUser) {
      const timer = setTimeout(() => {
        setLogoutMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, logoutMessage, isUser]);
  return (
    <>
      <div className="" onClick={() => dispatch(closeModal())}>
        <Navbar
          setMessage={setMessage}
          setIsUser={setIsUser}
          setLogoutMessage={setLogoutMessage}
        />
        <main className="flex flex-col gap-5  items-center  min-h-screen py-16  sm:py-24 px-2 sm:px-10 min-w-80">
          {children}
        </main>
        <Footer />
      </div>
      {message && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center">
          <div className="px-4 py-2 bg-violet-500 text-white font-mono text-[20px] rounded font-medium">
            Welcome, {isUser.name}!
            <SentimentSatisfiedRoundedIcon />
          </div>
        </div>
      )}
      {logoutMessage && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center">
          <div className="px-4 py-2 bg-violet-500 text-white font-mono text-[20px] rounded font-medium">
            You have successfully logged out!
            <SentimentSatisfiedRoundedIcon />
          </div>
        </div>
      )}
    </>
  );
}
export default MainLayout;
