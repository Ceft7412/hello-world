import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { clearUser } from "@/redux/authSlice";
// Redux
import { useSelector, useDispatch } from "react-redux";

export default function ProfileModal({ user, setIsLogin, setLogoutMessage }) {
  const dispatch = useDispatch();
  const nameModal = useSelector((state) => state.modal.nameModal);
  const modalShow = useSelector((state) => state.modal.modalShow);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

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

  const logout = async () => {
    try {
      await signOut(auth);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
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
            darkTheme ? "bg-gray-950" : "bg-white"
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
