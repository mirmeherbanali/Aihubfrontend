import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const writeBusinessReview = createAsyncThunk(
  "business/businessReview/writeBusinessReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + "/business/businessReview/writeBusinessReview",
        method: "POST",
        headers: "Content-Type:multipart/form-data",
        body: payload,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const writeIndividualReview = createAsyncThunk(
  "individual/individualReview/writeIndividualReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + "/individual/individualReview/writeIndividualReview",
        method: "POST",
        headers: "Content-Type:multipart/form-data",
        body: payload,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateReview = createAsyncThunk(
  "admin/review/updateReview",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/updateReview`,
        method: "PUT",
        headers: "Content-Type:multipart/form-data",
        body: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "/admin/review/getAllReviews",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/getAllReviews`,
        method: "POST",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getReviewDetails = createAsyncThunk(
  "/admin/review/getReviewDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/getReviewDetails`,
        method: "POST",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "/admin/review/deleteReview",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/deleteReview`,
        method: "DELETE",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateReviewSeen = createAsyncThunk(
  "/admin/review/updateReviewSeen",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/updateReviewSeen`,
        method: "PUT",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateReviewStatus = createAsyncThunk(
  "/admin/review/updateReviewStatus",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/updateReviewStatus`,
        method: "PUT",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const replyToReview = createAsyncThunk(
  "/admin/review/replyToReview",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/replyToReview`,
        method: "POST",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateReplyToReview = createAsyncThunk(
  "/admin/review/updateReplyToReview",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/updateReplyToReview`,
        method: "PUT",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteReplayReviw = createAsyncThunk(
  "/admin/review/deleteReplayReviw",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + `/admin/review/deleteReplayReviw`,
        method: "DELETE",
        body: formData,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    allReviews: [],
    reviewInfo: null,
    loading: false,
    reviewAdditionSuccessMessage: null,
    reviewAdditionErrorMessage: null,
    writeIndividualReviewSuccessMessage: null,
    writeIndividualReviewErrorMessage: null,
    reviewUpdateSuccessMessage: null,
    reviewUpdateErrorMessage: null,
    deleteReviewSuccessMessage: null,
    deleteReviewErrorMessage: null,
    updateReviewStatusSuccessMessage: null,
    updateReviewStatusErrorMessage: null,
    updateReplyToReviewSuccessMessage: null,
    updateReplyToReviewErrorMessage: null,
    deleteReplayReviwSuccessMessage: null,
    deleteReplayReviwErrorMessage: null,
  },
  reducers: {
    resetreviewAdditionMessage: (state) => {
      state.reviewAdditionSuccessMessage = null;
      state.reviewAdditionErrorMessage = null;
    },
    writeIndividualReviewResetMessage: (state) => {
      state.writeIndividualReviewSuccessMessage = null;
      state.writeIndividualReviewErrorMessage = null;
    },
    resetreviewUpdateMessage: (state) => {
      state.reviewUpdateSuccessMessage = null;
      state.reviewUpdateErrorMessage = null;
    },
    resetDeleteReviewMessage: (state) => {
      state.deleteReviewSuccessMessage = null;
      state.deleteReviewErrorMessage = null;
    },
    resetUpdateReviewStatusMessage: (state) => {
      state.updateReviewStatusSuccessMessage = null;
      state.updateReviewStatusErrorMessage = null;
    },
    resetUpdateReplyToReviewMessage: (state) => {
      state.updateReplyToReviewSuccessMessage = null;
      state.updateReplyToReviewErrorMessage = null;
    },
    resetDeleteReplayReviwMessage: (state) => {
      state.deleteReplayReviwSuccessMessage = null;
      state.deleteReplayReviwErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(writeBusinessReview.pending, (state, action) => {
        state.loading = true;
        state.reviewAdditionErrorMessage = null;
      })
      .addCase(writeBusinessReview.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.reviewAdditionErrorMessage = action?.payload?.result?.message;
        } else {
          state.reviewAdditionSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(writeBusinessReview.rejected, (state, action) => {
        state.loading = false;
        state.reviewAdditionErrorMessage = action?.payload?.result?.message;
      })
      .addCase(writeIndividualReview.pending, (state) => {
        state.loading = true;
        state.writeIndividualReviewErrorMessage = null;
      })
      .addCase(writeIndividualReview.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.writeIndividualReviewErrorMessage = action?.payload?.result?.message;
        } else {
          state.writeIndividualReviewSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(writeIndividualReview.rejected, (state, action) => {
        state.loading = false;
        state.writeIndividualReviewErrorMessage = action?.payload?.result?.message;
      })
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.allReviews = [];
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.allReviews = [];
        } else {
          state.allReviews = action?.payload?.result?.list;
        }
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.allReviews = [];
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.reviewUpdateErrorMessage = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.reviewUpdateErrorMessage = action?.payload?.result?.message;
        } else {
          state.reviewUpdateSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.reviewUpdateErrorMessage = action?.payload?.result?.message;
      })
      .addCase(getReviewDetails.pending, (state) => {
        state.loading = true;
        state.reviewInfo = null;
      })
      .addCase(getReviewDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.reviewInfo = null;
        } else {
          state.reviewInfo = action?.payload?.result?.list;
        }
      })
      .addCase(getReviewDetails.rejected, (state, action) => {
        state.loading = false;
        state.reviewInfo = null;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.deleteReviewErrorMessage = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.deleteReviewErrorMessage = action?.payload?.result?.message;
        } else {
          state.deleteReviewSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.deleteReviewErrorMessage = action?.payload?.result?.message;
      })
      .addCase(updateReviewStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReviewStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.updateReviewStatusErrorMessage = action?.payload?.result?.message;
        } else {
          state.updateReviewStatusSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(updateReviewStatus.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateReplyToReview.pending, (state) => {
        state.loading = true;
        state.updateReplyToReviewErrorMessage = null;
      })
      .addCase(updateReplyToReview.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.updateReplyToReviewErrorMessage = action?.payload?.result?.message;
        } else {
          state.updateReplyToReviewSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(updateReplyToReview.rejected, (state, action) => {
        state.loading = false;
        state.updateReplyToReviewErrorMessage = action?.payload?.result?.message;
      })
      .addCase(deleteReplayReviw.pending, (state) => {
        state.loading = true;
        state.deleteReplayReviwErrorMessage = null;
      })
      .addCase(deleteReplayReviw.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.deleteReplayReviwErrorMessage = action?.payload?.result?.message;
        } else {
          state.deleteReplayReviwSuccessMessage = action?.payload?.result?.message;
        }
      })
      .addCase(deleteReplayReviw.rejected, (state, action) => {
        state.loading = false;
        state.deleteReplayReviwErrorMessage = action?.payload?.result?.message;
      });
  },
});

export const {
  resetreviewAdditionMessage,
  resetreviewUpdateMessage,
  resetDeleteReviewMessage,
  resetUpdateReviewStatusMessage,
  resetUpdateReplyToReviewMessage,
  resetDeleteReplayReviwMessage,
  writeIndividualReviewResetMessage,
} = reviewSlice.actions;

export default reviewSlice.reducer;