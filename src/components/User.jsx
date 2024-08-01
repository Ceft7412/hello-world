import React from "react";
import { auth } from "@/firebase/firebase";

export default function User() {
  return <div>{auth.currentUser}</div>;
}
