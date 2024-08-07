import { createSlice } from "@reduxjs/toolkit";

let initialState;
if (typeof window !== "undefined") {
  initialState = localStorage.getItem("active")
    ? JSON.parse(localStorage.getItem("active"))
    : { active: "allblogs" };
} else {
  initialState = { active: "allblogs" };
}

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("active", JSON.stringify(state));
      }
    },
  },
});

export const { setActive } = activeSlice.actions;
export default activeSlice.reducer;
