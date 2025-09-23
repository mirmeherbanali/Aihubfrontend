import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const getBusinessDetails = createAsyncThunk(
  "business/business/getBusinessDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + "/business/business/getBusinessDetails",
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

export const checkProfileCompletion = createAsyncThunk(
  "business/business/checkProfileCompletion",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: process.env.NEXT_PUBLIC_API_URL + "/business/business/checkProfileCompletion",
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

export const getAllBusiness = createAsyncThunk(
  "business/business/getAllBusiness",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/business/getAllBusiness`,
        method: "POST",
        body: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getBusinessCategory = createAsyncThunk(
  "business/business/getBusinessCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/business/getBusinessCategory`,
        method: "POST",
        body: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    businessInfo: null,
    loading: false,
    businessList: null,
    businessCategoryList: [],
    profileCompletion: {
      isProfileComplete: true,
      missingFields: [],
      percentageOfCompletion: 0,
    },
  },
  reducers: {
    resetCheckProfileCompletion: (state) => {
      state.profileCompletion = {
        isProfileComplete: true,
        missingFields: [],
        percentageOfCompletion: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBusinessDetails.pending, (state, action) => {
        state.loading = true;
        state.businessInfo = null;
      })
      .addCase(getBusinessDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.businessInfo = null;
        } else {
          state.businessInfo = action?.payload?.result?.list;
        }
      })
      .addCase(getBusinessDetails.rejected, (state, action) => {
        state.loading = false;
        state.businessInfo = null;
      })
      .addCase(getAllBusiness.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllBusiness.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.businessList = null;
        } else {
          state.businessList = action?.payload?.result?.list;
        }
      })
      .addCase(getAllBusiness.rejected, (state, action) => {
        state.loading = false;
        state.businessList = null;
      })
      .addCase(getBusinessCategory.pending, (state, action) => {
        state.loading = true;
        state.businessCategoryList = [];
      })
      .addCase(getBusinessCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.businessCategoryList = [];
        } else {
          state.businessCategoryList = action?.payload?.result?.list;
        }
      })
      .addCase(getBusinessCategory.rejected, (state, action) => {
        state.loading = false;
        state.businessCategoryList = [];
      })
      .addCase(checkProfileCompletion.pending, (state, action) => {
        state.loading = true;
        state.profileCompletion = {
          isProfileComplete: false,
          missingFields: [],
          percentageOfCompletion: 0,
        };
      })
      .addCase(checkProfileCompletion.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.profileCompletion = {
            isProfileComplete: false,
            missingFields: [],
            percentageOfCompletion: 0,
          };
        } else {
          state.profileCompletion = action?.payload?.result.list;
        }
      })
      .addCase(checkProfileCompletion.rejected, (state, action) => {
        state.loading = false;
        state.profileCompletion = {
          isProfileComplete: false,
          missingFields: [],
          percentageOfCompletion: 0,
        };
      });
  },
});

export const { resetCheckProfileCompletion } = businessSlice.actions;

export default businessSlice.reducer;