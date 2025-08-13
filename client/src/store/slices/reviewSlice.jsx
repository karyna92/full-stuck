
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/productApi";
import { getAccessToken } from "../../services/authService";

const SLICE_NAME = "reviews";

// Fetch all reviews
export const fetchReviews = createAsyncThunk(
  `${SLICE_NAME}/fetchReviews`,
  async (productId, thunkAPI) => {
    try {
      const response = await API.getReviews(productId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a review
export const createReview = createAsyncThunk(
  `${SLICE_NAME}/createReview`,
  async (reviewData, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.createReview(reviewData, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  `${SLICE_NAME}/deleteReview`,
  async (id, thunkAPI) => {
    try {
      const token = getAccessToken();
      await API.deleteReview(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
