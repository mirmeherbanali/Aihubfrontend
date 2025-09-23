import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const registerAdmin = createAsyncThunk(
  "admin/auth/registerAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/registerAdmin`,
        method: "POST",
        body: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "admin/auth/loginAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/loginAdmin`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getAdminInfo = createAsyncThunk(
  "admin/auth/getAdminInfo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/getAdminInfo`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "admin/auth/logoutAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/logoutAdmin`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteAdminUser = createAsyncThunk(
  "",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/deleteAdminUser`,
        method: "DELETE",
        body: payload,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateAdminProfile = createAsyncThunk(
  "/admin/auth/updateAdminProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/updateAdminProfile`,
        method: "POST",
        body: payload,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    adminUsers: [],
    adminInfo: null,
    loading: false,
    isAuthenticated: false,
    registerAdminSuccessMessage: null,
    registerAdminErrorMessage: null,
    loginAdminSuccessMessage: null,
    loginAdminErrorMessage: null,
    logoutAdminSuccessMessage: null,
    logoutAdminErrorMessage: null,
    deleteAdminUserSuccessMessage: null,
    deleteAdminUserErrorMessage: null,
    updateAdminUserSuccessMessage: null,
    updateAdminUserErrorMessage: null,
  },
  reducers: {
    resetAdminRegistrationMessage: (state) => {
      state.registerAdminSuccessMessage = null;
      state.registerAdminErrorMessage = null;
    },
    resetLoginAdminMessage: (state) => {
      state.loginAdminSuccessMessage = null;
      state.loginAdminErrorMessage = null;
    },
    resetLogoutAdminMessage: (state) => {
      state.logoutAdminSuccessMessage = null;
      state.logoutAdminErrorMessage = null;
    },
    resetDeleteAdminUserMessage: (state) => {
      state.deleteAdminUserSuccessMessage = null;
      state.deleteAdminUserErrorMessage = null;
    },
    resetUpdateAdminUserMessage: (state) => {
      state.updateAdminUserSuccessMessage = null;
      state.updateAdminUserErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.registerAdminErrorMessage = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.success === false) {
          state.registerAdminErrorMessage = action.payload?.result?.message;
        } else {
          state.registerAdminSuccessMessage = action.payload?.result?.message;
        }
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.registerAdminErrorMessage = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.loginAdminErrorMessage = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.adminInfo = null;
          state.isAuthenticated = false;
        } else {
          state.loginAdminSuccessMessage = action.payload?.result?.message;
          state.adminInfo = action.payload?.result?.list;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.loginAdminErrorMessage = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(getAdminInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === true) {
          state.adminInfo = action.payload?.result?.list[0];
        } else {
          state.isAuthenticated = false;
          state.adminInfo = null;
        }
      })
      .addCase(getAdminInfo.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.logoutAdminErrorMessage = null;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.logoutAdminErrorMessage = action.payload?.result?.message;
        } else {
          state.logoutAdminSuccessMessage = action.payload?.result?.message;
          state.adminInfo = null;
          state.isAuthenticated = false;
          sessionStorage.clear();
          localStorage.clear();
        }
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.logoutAdminErrorMessage = action.payload;
      })
      .addCase(deleteAdminUser.pending, (state) => {
        state.loading = true;
        state.deleteAdminUserErrorMessage = null;
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload?.success === false) {
          state.deleteAdminUserErrorMessage = action?.payload?.result?.message;
        } else {
          state.deleteAdminUserSuccessMessage =
            action?.payload?.result?.message;
        }
      })
      .addCase(deleteAdminUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
        state.updateAdminUserErrorMessage = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload?.success === false) {
          state.updateAdminUserErrorMessage = action?.payload?.result?.message;
        } else {
          state.updateAdminUserSuccessMessage =
            action?.payload?.result?.message;
          state.adminInfo = action.payload?.result?.list;
        }
      })
      .addCase(updateAdminProfile.rejected, (state) => {
        state.loading = false;
        state.updateAdminUserErrorMessage = null;
      });
  },
});

export const {
  resetAdminRegistrationMessage,
  resetLoginAdminMessage,
  resetLogoutAdminMessage,
  resetDeleteAdminUserMessage,
  resetUpdateAdminUserMessage,
} = authSlice.actions;

export default authSlice.reducer;