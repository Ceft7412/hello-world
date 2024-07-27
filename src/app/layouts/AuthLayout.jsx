import React from "react";

function AuthLayout({ children }) {
  return (
    <main className="flex bg-gray-100 items-center justify-center min-h-screen pb-32 px-10">
      {children}
    </main>
  );
}

export default AuthLayout;
