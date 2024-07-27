"use client";

import React from "react";
import AdminLayout from "@/app/layouts/AdminLayout";
function page() {
  return (
    <Protected allowedRoles={["admin"]}>
      <AdminLayout>
        <div>Dashboard</div>
      </AdminLayout>
    </Protected>
  );
}

export default page;
