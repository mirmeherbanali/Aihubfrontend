import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const requestIndividualForReview = createAsyncThunk(
    "individual/requestReview/requestIndividualForReview",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: process.env.NEXT_PUBLIC_API_URL + "/individual/requestReview/requestIndividualForReview",
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

export const getAllIndividualRequestReview = createAsyncThunk(
    "individual/requestReview/getAllIndividualRequestReview",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: process.env.NEXT_PUBLIC_API_URL + "/individual/requestReview/getAllIndividualRequestReview",
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

export const requestIndividualForReviewSlice = createSlice({
    name: "requestIndividualForReview",
    initialState: {
        requestForReviewData: null,
        loading: false,
        requestIndividualForReviewSuccessMessage: null,
        requestIndividualForReviewErrorMessage: null,
    },
    reducers: {
        requestIndividualForReviewMessage: (state) => {
            state.requestIndividualForReviewSuccessMessage = null;
            state.requestIndividualForReviewErrorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestIndividualForReview.pending, (state, action) => {
                state.loading = true;
                state.requestIndividualForReviewErrorMessage = null;
            })
            .addCase(requestIndividualForReview.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.requestIndividualForReviewErrorMessage = action?.payload?.result?.message;
                } else {
                    state.requestIndividualForReviewSuccessMessage = action?.payload?.result?.message;
                }
            })
            .addCase(requestIndividualForReview.rejected, (state, action) => {
                state.loading = false;
                state.requestIndividualForReviewErrorMessage = action.payload;
            })
            .addCase(getAllIndividualRequestReview.pending, (state, action) => {
                state.loading = true;
                state.requestForReviewData = null;
            })
            .addCase(getAllIndividualRequestReview.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.requestForReviewData = null;
                } else {
                    state.requestForReviewData = action?.payload?.result?.list;
                }
            })
            .addCase(getAllIndividualRequestReview.rejected, (state, action) => {
                state.loading = false;
                state.requestForReviewData = null;
            });
    },
});

export const { requestIndividualForReviewMessage } = requestIndividualForReviewSlice.actions;

export default requestIndividualForReviewSlice.reducer;