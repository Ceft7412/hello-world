import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../redux/themeSlice";
import authReducer from "../redux/authSlice";
import blogsReducer from "../redux/blogsSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    blogs: blogsReducer,
  },
});
