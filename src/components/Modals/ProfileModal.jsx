import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { clearUser } from "@/redux/authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export default function ProfileModal({ user, setIsLogin, setLogoutMessage }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const nameModal = useSelector((state) => state.modal.nameModal);
  const modalShow = useSelector((state) => state.modal.modalShow);
  const themeColor = useSelector((state) => state.theme.themeColor);

  const modalVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        // type: "spring",
        // stiffness: 120,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const clearCookies = () => {
    const cookies = ["token", "user", "role"];
    cookies.forEach((cookie) => {
      document.cookie = `${cookie}=; Path=/; SameSite=Strict; Max-Age=0`;
    });
  };

  const logout = async () => {
    try {
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists() && userSnapshot.data().role !== "admin") {
        await signOut(auth);
        router.push("/");
      } else {
        await signOut(auth);
        router.push("/admin/signin");
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
        clearCookies();
      }
      setLogoutMessage(true);
      setIsLogin(false);  
      dispatch(clearUser());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AnimatePresence>
      {modalShow && nameModal === "profile-modal" && (
        <motion.div
          className={`modal-out  ${
            themeColor === "dark" ? "bg-gray-950" : "bg-white"
          } rounded absolute shadow-md right-0`}
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p
            className="p-2 whitespace-nowrap cursor-pointer hover:bg-sky-300/[.06]"
            onClick={user ? logout : null}
          >
            Sign out
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
