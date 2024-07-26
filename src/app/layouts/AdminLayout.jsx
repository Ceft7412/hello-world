import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
function AdminLayout({ children }) {
  return (
    <>
      <Navbar isShow={false} />
      <main className="flex items-center  justify-center min-h-screen py-24 px-10">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default AdminLayout;
