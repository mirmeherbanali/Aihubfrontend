import fetchAPI from "@/common/Hooks/fetchAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllAdminUsers = createAsyncThunk(
  "/admin/admin/getAllAdminUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/admin/getAllAdminUsers`,
        method: "POST",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    adminLists: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdminUsers.pending, (state) => {
        state.loading = true;
        state.adminLists = [];
      })
      .addCase(getAllAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success === false) {
          state.adminLists = [];
        } else {
          state.adminLists = action.payload.result.list;
        }
      })
      .addCase(getAllAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.adminLists = [];
      });
  },
});

export default adminSlice.reducer;
