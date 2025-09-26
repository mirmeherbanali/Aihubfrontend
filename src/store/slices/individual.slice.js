import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const getAllIndividuals = createAsyncThunk(
  "individual/individual/getAllIndividuals",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/individual/getAllIndividuals`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getIndividualDetails = createAsyncThunk(
  "individual/individual/getIndividualDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/individual/getIndividualDetails`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getIndividualCategory = createAsyncThunk(
  "individual/individual/getIndividualCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/individual/getIndividualCategory`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const checkProfileCompletion = createAsyncThunk(
  "individual/individual/checkProfileCompletion",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url:
          process.env.NEXT_PUBLIC_API_URL +
          "/individual/individual/checkProfileCompletion",
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

const individualSlice = createSlice({
  name: "individual",
  initialState: {
    loading: false,
    individualLists: [],
    individualInfo: null,
    individualCategoryList: [],
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
      .addCase(getAllIndividuals.pending, (state) => {
        state.loading = true;
        state.individualLists = [];
      })
      .addCase(getAllIndividuals.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.individualLists = [];
        } else {
          state.individualLists = action.payload?.result?.list;
        }
      })
      .addCase(getAllIndividuals.rejected, (state, action) => {
        state.loading = false;
        state.individualLists = [];
      })
      .addCase(getIndividualDetails.pending, (state) => {
        state.loading = true;
        state.individualInfo = null;
      })
      .addCase(getIndividualDetails.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.success === false) {
          state.individualInfo = null;
        } else {
          state.individualInfo = action.payload?.result?.list;
        }
      })
      .addCase(getIndividualDetails.rejected, (state, action) => {
        state.loading = false;
        state.individualInfo = null;
      })
      .addCase(getIndividualCategory.pending, (state) => {
        state.loading = true;
        state.individualCategoryList = [];
      })
      .addCase(getIndividualCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.individualCategoryList = [];
        } else {
          state.individualCategoryList = action.payload?.result?.list;
        }
      })
      .addCase(getIndividualCategory.rejected, (state, action) => {
        state.loading = false;
        state.individualCategoryList = [];
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

export const { resetCheckProfileCompletion } = individualSlice.actions;

export default individualSlice.reducer;
