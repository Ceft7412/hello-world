"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default Providers;
