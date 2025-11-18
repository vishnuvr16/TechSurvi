import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../api/fakestore";

export const loadProducts = createAsyncThunk("products/load", async (_, thunkAPI) => {
  try {
    const res = await fetchProducts();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to load");
  }
});

export const loadProductById = createAsyncThunk("products/loadById", async (id, thunkAPI) => {
  try {
    const res = await fetchProductById(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to load product");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    selected: null,
    selectedStatus: "idle",
    selectedError: null
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
      state.selectedStatus = "idle";
      state.selectedError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loadProductById.pending, (state) => {
        state.selectedStatus = "loading";
        state.selectedError = null;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selected = action.payload;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError = action.payload;
      });
  }
});

export const { clearSelected } = productsSlice.actions;
export default productsSlice.reducer;
