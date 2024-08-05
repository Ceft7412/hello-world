"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase"; // replace with your firebase config

export default function Protected(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Fetch the user's document from the 'users' collection
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          // Check the user's role
          if (userSnapshot.exists()) {
            if (userSnapshot.data().role !== "admin") {
              // Redirect the user to the home page if they are not an admin
              router.push("/");
            }
          } else {
            // Redirect the user to the home page if their document doesn't exist
            router.push("/");
          }
        } else {
          // Redirect the user to the sign in page if they are not authenticated
          router.push("/signin");
        }
      });

      // Clean up the onAuthStateChanged listener when the component is unmounted
      return unsubscribe;
    }, []);

    return <Component {...props} />;
  };
}
