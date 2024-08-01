"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-5  items-center  min-h-screen py-24 px-10">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
