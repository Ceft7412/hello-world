import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalShow: false,
    nameModal: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.modalShow = !state.modalShow;
      state.nameModal = action.payload;
    },

    closeModal: (state) => {
      state.modalShow = false;
      state.nameModal = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
