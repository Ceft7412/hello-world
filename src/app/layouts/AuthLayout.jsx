import React from "react";

function AuthLayout({ children }) {
  return (
    <main className="flex bg-gray-100 items-center justify-center min-h-screen  px-10">
      {children}
    </main>
  );
}

export default AuthLayout;
