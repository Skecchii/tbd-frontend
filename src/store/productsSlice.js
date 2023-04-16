import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk("products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      return response.data;
    } catch (err) {
      console.error(`failed to fetch products, ${err}`);
    }
  });

const createNewProduct = createAsyncThunk("products/createNewProduct",
  async (productData) => {
    try {
      const response = await axios.post("http://localhost:4000/products/create", productData);
      return response.data;
    } catch (err) {
      console.error(`failed to create product, ${err}`);
    }
  }
);

const deleteExistingProduct = createAsyncThunk("products/deleteExistingProduct",
  async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}/delete`);
      return productId;
    } catch (err) {
      console.error(`failed to delete product, ${err}`)
    }
  }
);

const updateExistingProduct = createAsyncThunk("products/updateExistingProduct",
  async ({ productId, productData }) => {
    try {
      const response = await axios.patch(`http://localhost:4000/products/${productId}/update`, productData);
      return response.data;
    } catch (err) {
      console.error(`failed to update the product, ${err}`)
    }
  }
);

const getProductsByCategory = createAsyncThunk("products/getProductsByCategory",
  async (categoryName) => {
    try {
      const response = await axios.get(`http://localhost:4000/products/category/${categoryName}`)
      return response.data
    } catch (err) {
      console.error(`failed to get products by category, ${err}`)
    }
  }
);

const uploadImage = createAsyncThunk("products/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/cloudinary/upload", formData);
      return response.data
    } catch (err) {
      console.error(`failed to upload image, ${err}`)
    }
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
        state.status = "error";
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
        state.status = "error";
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
        state.status = "error";
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
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(getProductsByCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = "succes";
        state.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "success";
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export {
  fetchProducts,
  createNewProduct,
  deleteExistingProduct,
  updateExistingProduct,
  getProductsByCategory,
  uploadImage
};
export default productsSlice.reducer;
