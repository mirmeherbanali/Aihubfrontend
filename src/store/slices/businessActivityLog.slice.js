import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const getAllActivityLogs = createAsyncThunk(
    "business/business/getAllActivityLogs",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: `${process.env.NEXT_PUBLIC_API_URL}/business/activityLog/getAllActivityLogs`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

export const businessActivityLogsSlice = createSlice({
    name: "businessActivityLogs",
    initialState: {
        loading: false,
        businessActivityLogs: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllActivityLogs.pending, (state) => {
                state.loading = true;
                state.businessActivityLogs = [];
            })
            .addCase(getAllActivityLogs.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.businessActivityLogs = [];
                } else {
                    state.businessActivityLogs = action?.payload?.result?.list;
                }
            })
            .addCase(getAllActivityLogs.rejected, (state) => {
                state.loading = false;
                state.businessActivityLogs = [];
            })
    },
});

export default businessActivityLogsSlice.reducer;