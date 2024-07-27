// providers.js
"use client";

import { Provider } from "react-redux";
import Mounth from "./mount";
import store from "@/redux/store"; // Adjust the path based on your directory structure

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Mounth>{children}</Mounth>
    </Provider>
  );
};

export default Providers;
