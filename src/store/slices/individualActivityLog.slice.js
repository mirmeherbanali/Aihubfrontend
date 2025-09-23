import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const getAllActivityLogs = createAsyncThunk(
  "business/business/getAllActivityLogs",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/activityLog/getAllActivityLogs`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const individualActivityLogsSlice = createSlice({
    name: "individualActivityLogs",
    initialState: {
        loading: false,
        individualActivityLogs: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllActivityLogs.pending, (state) => {
                state.loading = true;
                state.individualActivityLogs = [];
            })
            .addCase(getAllActivityLogs.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === false) {
                    state.individualActivityLogs = [];
                } else {
                    state.individualActivityLogs = action?.payload?.result?.list;
                }
            })
            .addCase(getAllActivityLogs.rejected, (state) => {
                state.loading = false;
                state.individualActivityLogs = [];
            })
    },
});

export default individualActivityLogsSlice.reducer;