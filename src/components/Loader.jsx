import React from "react";
import MainLayout from "@/app/layouts/MainLayout";
export default function Loader() {
  return (
    <MainLayout>
      <div className="lds-facebook text-gray-950">
        <div className="bg-gray-950"></div>
        <div className="bg-gray-950"></div>
        <div className="bg-gray-950"></div>
      </div>
    </MainLayout>
  );
}
