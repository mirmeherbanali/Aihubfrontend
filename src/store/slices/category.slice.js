import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const createCategory = createAsyncThunk(
  "admin/category/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/category/createCategory`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "admin/category/getAllCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/category/getAllCategory`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "admin/category/updateCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/category/updateCategory`,
        method: "PUT",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "admin/category/deleteCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/category/deleteCategory`,
        method: "DELETE",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: null,
    loading: false,
    searchCategoryMessage: null,
    createCategorySuccessMessage: null,
    createCategoryErrorMessage: null,
    updateCategorySuccessMessage: null,
    updateCategoryErrorMessage: null,
    deleteCategorySuccessMessage: null,
    deleteCategoryErrorMessage: null,
  },
  reducers: {
    resetCreateCategoryMessage: (state) => {
      state.createCategorySuccessMessage = null;
      state.createCategoryErrorMessage = null;
    },
    resetUpdateCategoryMessage: (state) => {
      state.updateCategorySuccessMessage = null;
      state.updateCategoryErrorMessage = null;
    },
    resetDeleteCategoryMessage: (state) => {
      state.deleteCategorySuccessMessage = null;
      state.deleteCategoryErrorMessage = null;
    },
    resetSearchCategoryMessage: (state) => {
      state.searchCategoryMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.createCategoryErrorMessage = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.createCategoryErrorMessage = action.payload?.result?.message;
        } else {
          state.createCategorySuccessMessage = action.payload?.result?.message;
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.createCategoryErrorMessage = action.payload;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === true) {
          state.categoryList = action.payload?.result?.list;
        } else {
          state.searchCategoryMessage = action.payload?.result?.message
          state.categoryList = [];
        }
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.updateCategoryErrorMessage = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.updateCategoryErrorMessage = action.payload?.result?.message;
        } else {
          state.updateCategorySuccessMessage = action.payload?.result?.message;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.updateCategoryErrorMessage = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.deleteCategoryErrorMessage = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.deleteCategoryErrorMessage = action.payload?.result?.message;
        } else {
          state.deleteCategorySuccessMessage = action.payload?.result?.message;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.deleteCategoryErrorMessage = action.payload;
      });
  },
});

export const {
  resetCreateCategoryMessage,
  resetUpdateCategoryMessage,
  resetDeleteCategoryMessage,
  resetSearchCategoryMessage
} = categorySlice.actions;

export default categorySlice.reducer;