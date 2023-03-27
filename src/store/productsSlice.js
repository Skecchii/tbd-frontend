import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("http://localhost:4000/product");
  return response.data;
});

const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (productData) => {
    const response = await axios.post(
      "http://localhost:4000/product",
      productData
    );
    return response.data;
  }
);

const deleteExistingProduct = createAsyncThunk(
  "products/deleteExistingProduct",
  async (productId) => {
    await axios.delete(`http://localhost:4000/product/${productId}`);
    return productId;
  }
);

const updateExistingProduct = createAsyncThunk(
  "products/updateExistingProduct",
  async ({productId, productData}) => {
    const response = await axios.patch(
      `http://localhost:4000/product/${productId}`,
      productData
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products.push(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteExistingProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteExistingProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteExistingProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateExistingProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.status = "success";
        const updatedProduct = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        state.products[updatedProduct] = {
          ...state.products[updatedProduct],
          ...action.payload,
        };
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export {
  fetchProducts,
  createNewProduct,
  deleteExistingProduct,
  updateExistingProduct,
};
export default productsSlice.reducer;
