import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="flex items-center justify-center min-h-screen sm:ml-[180px] py-24 px-4 sm:px-10 min-w-80">
        {children}
      </main>
    </>
  );
}

export default AdminLayout;
