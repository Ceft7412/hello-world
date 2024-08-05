import React from "react";
import MainLayout from "@/app/layouts/MainLayout";
import Protected from "../../../components/Protected";
function Dashboard() {
  return (
    <MainLayout>
      <div>Dashboard</div>
    </MainLayout>
  );
}

export default Protected(Dashboard);
