// "use client";

// import { useState, useEffect } from "react";
// import AuthLayout from "@/app/layouts/AuthLayout";
// import { redirect } from "next/navigation";
// import { isAuthenticated } from "@/utils/Auth";
// import MailRoundedIcon from "@mui/icons-material/MailRounded";
// import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
// import { useSelector } from "react-redux";
// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isEnterPressed, setIsEnterPressed] = useState(false);
//   const [error, setError] = useState(false);+
//   const [clientError, setClientError] = useState(null);
//   const role = useSelector((state) => state.auth.role);
//   const user = useSelector((state) => state.auth.user);
//   // Handle Enter key

//   const handlePressKey = (e) => {
//     if (e.key === "Enter") {
//       setIsEnterPressed(e);
//     }
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setClientError("Please fill all the fields.");
//       return;
//     } else {
//       setClientError(null);
//     }
//     try {
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (role === "users" && user) {
//     redirect("/");
//   }
//   return (
//     <AuthLayout>
//       <section className="w-80  h-80 rounded flex items-center flex-col">
//         {error && (
//           <p className="my-2 w-full bg-red-500 text-white p-2 text-center">{error}</p>
//         )}
//         {clientError && (
//           <p className="w-full bg-red-500 text-white p-2 text-center">{clientError}</p>
//         )}
//         <h1 className="w-full text-center font-medium p-2 text-2xl border-b-2">Admin</h1>
//         <ul className=" w-full mt-10">
//           <li className="w-full hover:bg-gray-200 cursor-pointer transition-colors  ease-in p-4 py-3 border-2 font-medium flex items-center justify-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="30"
//               height="30"
//               preserveAspectRatio="xMidYMid"
//               viewBox="0 0 256 262"
//               id="google"
//             >
//               <path
//                 fill="#4285F4"
//                 d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
//               ></path>
//               <path
//                 fill="#34A853"
//                 d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
//               ></path>
//               <path
//                 fill="#FBBC05"
//                 d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
//               ></path>
//               <path
//                 fill="#EB4335"
//                 d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
//               ></path>
//             </svg>
//             Continue with Google
//           </li>
//         </ul>
//         <span className="p-10 py-6">or</span>
//         <form
//           onSubmit={handleSignIn}
//           onKeyDown={handlePressKey}
//           onKeyUp={() => setIsEnterPressed(false)}
//           className="w-full flex flex-col gap-6"
//         >
//           <div className="w-full relative">
//             <MailRoundedIcon className="text-gray-600 absolute left-3 top-[50%] -translate-y-[50%]" />
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-4 py-3 pl-10 border-gray-500 border"
//               placeholder="Email"
//             />
//           </div>
//           <div className="w-full relative">
//             <KeyRoundedIcon className=" text-gray-600 absolute left-3 top-[50%] -translate-y-[50%]" />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 py-3 pl-10 border-gray-500 border"
//               placeholder="Password"
//             />
//           </div>
//           <button
//             className={`${
//               isEnterPressed ? "bg-violet-300" : "bg-violet-500"
//             } hover:bg-violet-600 active:scale-105 mt-6 p-4 w-full  text-white`}
//             type="submit"
//           >
//             Sign-in
//           </button>
//         </form>
//       </section>
//     </AuthLayout>
//   );
// }

// export default SignIn;
