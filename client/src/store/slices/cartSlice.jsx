import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/userApi";
import { getAccessToken } from "../../services/authService";

const SLICE_NAME = "cart";

// Fetch cart for current user
export const fetchCart = createAsyncThunk(
  `${SLICE_NAME}/fetchCart`,
  async (_, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.getCart(token);
      return response.data; // Assuming response.data is cart object or array
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Add or update product in cart
export const addOrUpdateProduct = createAsyncThunk(
  `${SLICE_NAME}/addOrUpdateProduct`,
  async (productData, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.addOrUpdateCartProduct(productData, token);
      return response.data; // Updated cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Remove product from cart
export const removeProduct = createAsyncThunk(
  `${SLICE_NAME}/removeProduct`,
  async (productId, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.removeCartProduct(productId, token);
      return response.data; // Updated cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Optional: Clear entire cart
export const clearCart = createAsyncThunk(
  `${SLICE_NAME}/clearCart`,
  async (_, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.clearUserCart(token);
      return response.data; // Empty cart or confirmation
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  cartItems: [], 
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetCart(state) {
      state.cartItems = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addOrUpdateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrUpdateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(addOrUpdateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
