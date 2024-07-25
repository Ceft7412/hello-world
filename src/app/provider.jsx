// providers.js
"use client";

import { Provider } from "react-redux";
import store from "@/redux/store"; // Adjust the path based on your directory structure

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
