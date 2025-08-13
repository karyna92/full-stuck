import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as API from "../../api/productApi";
import * as APIU from "../../api/userApi";
import { getAccessToken } from "../../services/authService";

const SLICE_NAME = "orders";

// Fetch orders for current user
export const fetchOrdersByUser = createAsyncThunk(
  `${SLICE_NAME}/fetchOrdersByUser`,
  async (_, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await APIU.getOrdersByUser(token);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Add new order
export const addOrder = createAsyncThunk(
  `${SLICE_NAME}/addOrder`,
  async (orderData, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.createOrder(orderData, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update order (admin only)
export const updateOrder = createAsyncThunk(
  `${SLICE_NAME}/updateOrder`,
  async ({ orderId, updateData }, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.updateOrder(orderId, updateData, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Optional: Delete order (admin)
export const deleteOrder = createAsyncThunk(
  `${SLICE_NAME}/deleteOrder`,
  async (orderId, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.deleteOrder(orderId, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearOrders(state) {
      state.orders = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
