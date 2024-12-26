import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/Api";

export const createProduct = createAsyncThunk(
  "product/create",
  async (data, { rejectWithValue }) => {
    try {
      let res = await API.post("/products", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      let res = await API.get("/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload);
      })

      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      });
  },
});



export const productReducer = productSlice.reducer
