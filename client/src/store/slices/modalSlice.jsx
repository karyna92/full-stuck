import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "modal";

const initialState = {
  loginModal: false,
  botModal: false,
  cartModal: false,
  orderModal: false,
};

const modalSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.loginModal = !state.loginModal;
    },
    toggleBotModal: (state) => {
      state.botModal = !state.botModal;
    },
    toggleCartModal: (state) => {
      state.cartModal = !state.cartModal;
    },
    toggleOrderModal: (state) => {
      state.orderModal = !state.orderModal;
    },
  },
});

export const {
  toggleLoginModal,
  toggleBotModal,
  toggleCartModal,
  toggleOrderModal,
} = modalSlice.actions;

export default modalSlice.reducer;
