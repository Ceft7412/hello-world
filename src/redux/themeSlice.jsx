import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeColor: "",
  },
  reducers: {
    setThemeAction: (state, action) => {
      state.themeColor = action.payload;
    },
  },
});

export const { setThemeAction } = themeSlice.actions;
export default themeSlice.reducer;
