import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    reviews: reviewReducer,

  },
});
export default store;
