// providers.js
"use client";

import { Provider } from "react-redux";
import Mounth from "./mount";
import store from "@/redux/store";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Mounth>{children}</Mounth>
    </Provider>
  );
};

export default Providers;
