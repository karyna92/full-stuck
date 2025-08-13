import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as API from "../../api/productApi";
import { getAccessToken } from "../../services/authService";

const SLICE_NAME = "products";

export const getProducts = createAsyncThunk(
  `${SLICE_NAME}/getProducts`,
  async (page, thunkAPI) => {
    try {
      const data = await API.getProducts(page);
      if (data?.data && data?.currentPage && data?.totalPages) {
        console.log(data);
        return data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  `${SLICE_NAME}/createProduct`,
  async (product, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.addProduct(product, token);
      return response.data; // assume new product returned here
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await API.getProductById(id);
      console.log("Fetched product data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  `${SLICE_NAME}/updateProduct`,
  async (product, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await API.updateProduct(product, token);
      return response.data; // assume updated product returned here
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  `${SLICE_NAME}/deleteProduct`,
  async (id, thunkAPI) => {
    try {
      const token = getAccessToken();
      await API.deleteProduct(id, token);
      return id; // just return deleted product id
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const productsSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    products: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
  },

  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //  fetching one product
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentProduct = null; // reset previous product
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload; // single product data here
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentProduct = null;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

/// selectors
const selectProducts = (state) => state.products.products;
const selectCurrentProduct = (state) => state.products.currentProduct;

export const selectSimilarProducts = createSelector(
  [selectProducts, selectCurrentProduct],
  (products, product) => {
    if (!products.length || !product) return [];

    const currentName = product.name.toLowerCase();
    const nameParts = currentName.split(" ").filter((word) => word.length > 2);

    let similar = products.filter((p) => {
      if (p._id === product._id) return false;
      const productName = p.name.toLowerCase();
      return nameParts.some((word) => productName.includes(word));
    });

    if (similar.length === 0) {
      similar = products
        .filter((p) => p._id !== product._id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    }

    return similar;
  }
);
export const { setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;
