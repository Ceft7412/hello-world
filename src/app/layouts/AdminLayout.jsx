"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useDispatch } from "react-redux";
import { setActive } from "@/redux/activeSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
function AdminLayout({ children }) {
  const pathName = usePathname();
  const [route, setRoute] = React.useState("");
  useEffect(() => {
    if (pathName) {
      const currentRoute = pathName.split("/")[2];
      setRoute(currentRoute);
    }
  }, [pathName]);
  return (
    <>
      <Navbar />
      <Sidebar currentRoute={route} />
      <main className="flex items-center justify-center min-h-screen sm:ml-[180px] pt-40 sm:pt-24 sm:py-24  px-4 sm:px-10 min-w-90">
        {children}
      </main>
    </>
  );
}

export default AdminLayout;
