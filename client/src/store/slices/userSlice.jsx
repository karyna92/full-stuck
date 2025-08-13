import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/userApi";
import {
  saveTokens,
  clearTokens,
  getAccessToken,
  refreshSession,
} from "../../services/authService";

const SLICE_NAME = "user";

export const registerUser = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async (userData, thunkAPI) => {
    try {
      const { user, tokens } = await API.registerUser(userData);
      saveTokens(tokens);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  `${SLICE_NAME}/loginUser`,
  async (credentials, thunkAPI) => {
    try {
      const { user, tokens } = await API.loginUser(credentials);
      saveTokens(tokens);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  `${SLICE_NAME}/fetchCurrentUser`,
  async (_, thunkAPI) => {
    let accessToken = getAccessToken();;
     if (!accessToken) {
       console.log("No access token found");
       return thunkAPI.rejectWithValue("No access token");
     }

    try {
      const { data } = await API.fetchCurrentUser(accessToken);
      return data.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        try {
          const tokens = await refreshSession(() => {
            clearTokens();
          });
          if (!tokens) return thunkAPI.rejectWithValue("Session expired");

          saveTokens(tokens);
          accessToken = tokens.accessToken;

          const { data } = await API.fetchCurrentUser(accessToken);
          return data.user;
        } catch {
          clearTokens();
          return thunkAPI.rejectWithValue("Session expired");
        }
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  `${SLICE_NAME}/updateUser`,
  async (formData , thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.updateUserProfile(formData, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
const userSlice = createSlice({
  name: SLICE_NAME,
  initialState: { user: null, isLoading: false, error: null },
  reducers: {
    logout(state) {
      state.user = null;
      clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
