import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../redux/themeSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
  },
});
