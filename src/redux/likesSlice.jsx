import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likesCount: 0,
  },
  reducers: {
    incrementLikes: (state) => {
      state.likesCount += 1;
    },
    decrementLikes: (state) => {
      state.likesCount -= 1;
    },
    setCountLikes: (state, action) => {
      state.likesCount = action.payload;
    },
  },
});

export const { incrementLikes, decrementLikes, setCountLikes } = likesSlice.actions;

export default likesSlice.reducer;
