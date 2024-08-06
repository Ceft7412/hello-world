import { createSlice } from "@reduxjs/toolkit";

export const activeSlice = createSlice({
  name: "active",
  initialState: {
    active: "all-blogs",
  },
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = activeSlice.actions;
export default activeSlice.reducer;
