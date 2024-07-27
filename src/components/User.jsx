import React, { useState, useEffect } from "react";
import { fetchCurrentUser } from "@/services/blogService";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  return <>{user ? "Logout" : "Sign in"}</>;
}
