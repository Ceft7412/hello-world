// providers.js
"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { setTheme } from "@/redux/themeSlice";

// Load the theme before the application starts
const savedDarkTheme = JSON.parse(localStorage.getItem("darkTheme"));
if (savedDarkTheme !== null) {
  store.dispatch(setTheme(savedDarkTheme));
}

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
