import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const requestBusinessForReview = createAsyncThunk(
    "business/requestReview/requestBusinessForReview",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: process.env.NEXT_PUBLIC_API_URL + "/business/requestReview/requestBusinessForReview",
                method: "POST",
                headers: "Content-Type:application/json",
                body: payload,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

export const getAllBusinessRequestReview = createAsyncThunk(
    "business/requestReview/getAllBusinessRequestReview",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: process.env.NEXT_PUBLIC_API_URL + "/business/requestReview/getAllBusinessRequestReview",
                method: "POST",
                headers: "Content-Type:application/json",
                body: payload,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

export const requestBusinessForReviewSlice = createSlice({
    name: "requestBusinessForReview",
    initialState: {
        requestForReviewData: null,
        loading: false,
        requestBusinessForReviewSuccessMessage: null,
        requestBusinessForReviewErrorMessage: null,
    },
    reducers: {
        requestBusinessForReviewMessage: (state) => {
            state.requestBusinessForReviewSuccessMessage = null;
            state.requestBusinessForReviewErrorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestBusinessForReview.pending, (state, action) => {
                state.loading = true;
                state.requestBusinessForReviewErrorMessage = null;
            })
            .addCase(requestBusinessForReview.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.requestBusinessForReviewErrorMessage = action?.payload?.result?.message;
                } else {
                    state.requestBusinessForReviewSuccessMessage = action?.payload?.result?.message;
                }
            })
            .addCase(requestBusinessForReview.rejected, (state, action) => {
                state.loading = false;
                state.requestBusinessForReviewErrorMessage = action.payload;
            })
            .addCase(getAllBusinessRequestReview.pending, (state, action) => {
                state.loading = true;
                state.requestForReviewData = null;
            })
            .addCase(getAllBusinessRequestReview.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.requestForReviewData = null;
                } else {
                    state.requestForReviewData = action?.payload?.result?.list;
                }
            })
            .addCase(getAllBusinessRequestReview.rejected, (state, action) => {
                state.loading = false;
                state.requestForReviewData = null;
            });
    },
});

export const { requestBusinessForReviewMessage } = requestBusinessForReviewSlice.actions;

export default requestBusinessForReviewSlice.reducer;