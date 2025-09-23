import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const createTestimonial = createAsyncThunk(
  "admin/testimonial/createTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/testimonial/createTestimonial`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getAllTestimonial = createAsyncThunk(
  "admin/testimonial/getAllTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/testimonial/getAllTestimonial`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "admin/testimonial/updateTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/testimonial/updateTestimonial`,
        method: "PUT",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "admin/testimonial/deleteTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/testimonial/deleteTestimonial`,
        method: "DELETE",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    TestimonialList: null,
    loading: false,
    createTestimonialSuccessMessage: null,
    createTestimonialErrorMessage: null,
    updateTestimonialSuccessMessage: null,
    updateTestimonialErrorMessage: null,
    deleteTestimonialSuccessMessage: null,
    deleteTestimonialErrorMessage: null,
  },
  reducers: {
    resetCreateTestimonialMessage: (state) => {
      state.createTestimonialSuccessMessage = null;
      state.createTestimonialErrorMessage = null;
    },
    resetUpdateTestimonialMessage: (state) => {
      state.updateTestimonialSuccessMessage = null;
      state.updateTestimonialErrorMessage = null;
    },
    resetDeleteCTestimonialMessage: (state) => {
      state.deleteTestimonialSuccessMessage = null;
      state.deleteTestimonialErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
        state.createTestimonialErrorMessage = null;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.createTestimonialErrorMessage = action.payload?.result?.message;
        } else {
          state.createTestimonialSuccessMessage =
            action.payload?.result?.message;
        }
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.createTestimonialErrorMessage = action.payload;
      })
      .addCase(getAllTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === true) {
          state.TestimonialList = action.payload?.result?.list;
        }
      })
      .addCase(getAllTestimonial.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.updateTestimonialErrorMessage = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.updateTestimonialErrorMessage = action.payload?.result?.message;
        } else {
          state.updateTestimonialSuccessMessage =
            action.payload?.result?.message;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.updateTestimonialErrorMessage = action.payload;
      })
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.deleteTestimonialErrorMessage = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.deleteTestimonialErrorMessage = action.payload?.result?.message;
        } else {
          state.deleteTestimonialSuccessMessage =
            action.payload?.result?.message;
        }
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.deleteTestimonialErrorMessage = action.payload;
      });
  },
});

export const {
  resetCreateTestimonialMessage,
  resetUpdateTestimonialMessage,
  resetDeleteTestimonialMessage,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;