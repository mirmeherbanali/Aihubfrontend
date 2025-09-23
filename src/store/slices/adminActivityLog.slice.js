import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const getAllActivityLogs = createAsyncThunk(
  "admin/admin/getAllActivityLogs",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/activityLog/getAllActivityLogs`,
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

export const adminActivityLogsSlice = createSlice({
  name: "adminActivityLogs",
  initialState: {
    loading: false,
    adminActivityLogs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllActivityLogs.pending, (state) => {
        state.loading = true;
        state.adminActivityLogs = [];
      })
      .addCase(getAllActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.adminActivityLogs = [];
        } else {
          state.adminActivityLogs = action?.payload?.result?.list;
        }
      })
      .addCase(getAllActivityLogs.rejected, (state) => {
        state.loading = false;
        state.adminActivityLogs = [];
      });
  },
});

export default adminActivityLogsSlice.reducer;
