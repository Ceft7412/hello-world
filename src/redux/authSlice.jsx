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
        const { role, email, displayName, photoURL } = action.payload;
        state.user = { role, email, displayName, photoURL };
        state.loading = false;
        state.role = role;
        state.email = email;
        state.name = displayName;
        state.photoURL = photoURL;
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
