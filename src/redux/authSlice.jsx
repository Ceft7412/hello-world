import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    role: null,
    email: null,
    name: null,
    photoURL: null,
  },

  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.loading = false;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.name = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
      } else {
        state.user = null;
        state.loading = false;
        state.role = null;
        state.email = null;
        state.name = null;
        state.photoURL = null;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      state.email = null;
      state.name = null;
      state.photoURL = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
