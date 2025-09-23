import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const createRecentSearch = createAsyncThunk(
    "business/recentSearch/createRecentSearch",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: process.env.NEXT_PUBLIC_API_URL + "/business/recentSearch/createRecentSearch",
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

export const getAllRecentSearches = createAsyncThunk(
    "business/recentSearch/getAllRecentSearches",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: process.env.NEXT_PUBLIC_API_URL + "/business/recentSearch/getAllRecentSearches",
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

export const recentSearchSlice = createSlice({
    name: "recentSearch",
    initialState: {
        recentSearch: null,
        loading: false,
        createRecentSearchSuccessMessage: null,
        createRecentSearchErrorMessage: null,
    },
    reducers: {
        resetCreateRecentSearchMessage: (state) => {
            state.createRecentSearchSuccessMessage = null;
            state.createRecentSearchErrorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecentSearch.pending, (state, action) => {
                state.loading = true;
                state.recentSearch = null;
            })
            .addCase(createRecentSearch.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.recentSearch = null;
                    state.createRecentSearchErrorMessage = action?.payload?.result?.message;
                } else {
                    state.recentSearch = action?.payload?.result?.list;
                    state.createRecentSearchSuccessMessage = action?.payload?.result?.message;
                }
            })
            .addCase(createRecentSearch.rejected, (state, action) => {
                state.loading = false;
                state.recentSearch = null;
            })
            .addCase(getAllRecentSearches.pending, (state, action) => {
                state.loading = true;
                state.recentSearch = null;
            })
            .addCase(getAllRecentSearches.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.recentSearch = null;
                } else {
                    state.recentSearch = action?.payload?.result?.list;
                }
            })
    },
});

export const { resetCreateRecentSearchMessage } = recentSearchSlice.actions;

export default recentSearchSlice.reducer;