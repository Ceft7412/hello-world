"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-5  items-center  min-h-screen py-16  sm:py-24 px-2 sm:px-10 min-w-80">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
