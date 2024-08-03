import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../redux/themeSlice";
import authReducer from "../redux/authSlice";
import blogsReducer from "../redux/blogsSlice";
import modalReducer from "../redux/modalSlice";
import likesReducer from "../redux/likesSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    blogs: blogsReducer,
    modal: modalReducer,
    likes: likesReducer,
  },
});
