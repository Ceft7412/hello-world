import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
  },
  reducers: {
    setBlogs(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
