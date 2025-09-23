import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const registerIndividualUser = createAsyncThunk(
  "individual/auth/registerIndividualUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/registerIndividualUser`,
        method: "POST",
        body: credentials,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const registerIndividual = createAsyncThunk(
  "individual/auth/registerIndividual",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/registerIndividual`,
        method: "POST",
        body: credentials,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const loginIndividualUser = createAsyncThunk(
  "individual/auth/loginIndividualUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/loginIndividualUser`,
        method: "POST",
        body: credentials,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateIndividualProfile = createAsyncThunk(
  "individual/auth/updateIndividualProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/updateIndividualProfile`,
        method: "POST",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const switchAccount = createAsyncThunk(
  "individual/auth/switchAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/switchAccount`,
        method: "POST",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "individual/user/getUserDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/user/getUserDetails`,
        method: "POST",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const logoutIndividualAccount = createAsyncThunk(
  "/individual/auth/logoutIndividual",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/logoutIndividual`,
        method: "PATCH",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const recoverIndividualAccount = createAsyncThunk(
  "/individual/auth/recoverAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/recoverAccount`,
        method: "PATCH",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const softDeleteAccount = createAsyncThunk(
  "/individual/auth/softDeleteAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/softDeleteAccount`,
        method: "DELETE",
        body: payload,
      });
      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteIndividualByAdmin = createAsyncThunk(
  "/individual/auth/deleteIndividualByAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/deleteIndividualByAdmin`,
        method: "DELETE",
        body: payload,
      });

      return response;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  "individual/auth/deactivateAccount",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/deactivateAccount`,
        method: "PATCH",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const reactivateAccount = createAsyncThunk(
  "/individual/auth/reactivateAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/reactivateAccount`,
        method: "PATCH",
        body: payload,
      });

      return response;
    } catch (error) {
      rejectWithValue(error?.data?.result?.message || error?.message);
    }
  }
);

const individualAuthSlice = createSlice({
  name: "individualAuth",
  initialState: {
    userInfo: null,
    loading: false,
    isAuthenticated: false,
    activeAccount: null,
    userDetails: null,
    userErrorData: null,
    registerIndividualUserSuccessMessage: null,
    registerIndividualUserErrorMessage: null,
    registerIndividualSuccessMessage: null,
    registerIndividualErrorMessage: null,
    loginIndividualUserSuccessMessage: null,
    loginIndividualUserErrorMessage: null,
    updateIndividualProfileSuccessMessage: null,
    updateIndividualProfileErrorMessage: null,
    switchAccountSuccessMessage: null,
    switchAccountErrorMessage: null,
    logoutIndividualAccountSuccessMessage: null,
    logoutIndividualAccountErrorMessage: null,
    softDeleteIndividualSuccessMessage: null,
    softDeleteIndividualErrorMessage: null,
    recoverAccountSuccessMessage: null,
    recoverAccountErrorMessage: null,
    adminDeleteIndividualSuccessMessage: null,
    adminDeleteIndividualErrorMessage: null,
    deactivateAccountSuccessMessage: null,
    deactivateAccountErrorMessage: null,
    reactivateAccountSuccessMessage: null,
    reactivateAccountErrorMessage: null,
  },
  reducers: {
    resetIndividualRegistrationMessage: (state) => {
      state.registerIndividualUserSuccessMessage = null;
      state.registerIndividualUserErrorMessage = null;
    },
    resetRegisterIndividualMessage: (state) => {
      state.registerIndividualSuccessMessage = null;
      state.registerIndividualErrorMessage = null;
    },
    resetIndividualLoginMessage: (state) => {
      state.loginIndividualUserSuccessMessage = null;
      state.loginIndividualUserErrorMessage = null;
    },
    resetUpdateIndividualProfileMessage: (state) => {
      state.updateIndividualProfileSuccessMessage = null;
      state.updateIndividualProfileErrorMessage = null;
    },
    resetSwitchAccountMessage: (state) => {
      state.switchAccountSuccessMessage = null;
      state.switchAccountErrorMessage = null;
    },
    resetIndividualLogoutMessage: (state) => {
      state.logoutIndividualAccountSuccessMessage = null;
      state.logoutIndividualAccountErrorMessage = null;
    },
    resetSoftDeleteAccountMessage: (state) => {
      state.softDeleteIndividualSuccessMessage = null;
      state.softDeleteIndividualErrorMessage = null;
    },
    resetRecoverAccountMessage: (state) => {
      state.recoverAccountSuccessMessage = null;
      state.recoverAccountErrorMessage = null;
    },
    resetAdminDeleteIndividualMessage: (state) => {
      state.adminDeleteIndividualSuccessMessage = null;
      state.adminDeleteIndividualErrorMessage = null;
    },
    resetDeactivateAccountMessage: (state) => {
      state.deactivateAccountSuccessMessage = null;
      state.deactivateAccountErrorMessage = null;
    },
    resetReactivateAccountMessage: (state) => {
      state.reactivateAccountSuccessMessage = null;
      state.reactivateAccountErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerIndividualUser.pending, (state) => {
        state.loading = true;
        state.registerIndividualUserErrorMessage = null;
      })
      .addCase(registerIndividualUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.registerIndividualUserErrorMessage =
            action.payload?.result?.message;
          state.isAuthenticated = false;
        } else {
          state.registerIndividualUserSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(registerIndividualUser.rejected, (state, action) => {
        state.loading = false;
        state.registerIndividualUserErrorMessage = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerIndividual.pending, (state) => {
        state.loading = true;
        state.registerIndividualErrorMessage = null;
      })
      .addCase(registerIndividual.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.registerIndividualErrorMessage =
            action.payload?.result?.message;
        } else {
          state.registerIndividualSuccessMessage =
            action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(registerIndividual.rejected, (state, action) => {
        state.loading = false;
        state.registerIndividualErrorMessage = action.payload;
      })
      .addCase(loginIndividualUser.pending, (state) => {
        state.loading = true;
        state.loginIndividualUserErrorMessage = null;
      })
      .addCase(loginIndividualUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.loginIndividualUserErrorMessage =
            action.payload?.result?.message;
          state.isAuthenticated = false;
          state.userErrorData = action.payload?.result?.list;
        } else {
          state.loginIndividualUserSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
          state.userErrorData = null;
          state.userInfo = action.payload?.result?.list;
          state.activeAccount = action.payload?.result?.list?.activeAccount;
        }
      })
      .addCase(loginIndividualUser.rejected, (state, action) => {
        state.loading = false;
        state.loginIndividualUserErrorMessage = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(switchAccount.pending, (state) => {
        state.loading = true;
        state.switchAccountErrorMessage = null;
      })
      .addCase(switchAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.switchAccountErrorMessage = action.payload?.result?.message;
          state.isAuthenticated = false;
        } else {
          state.switchAccountSuccessMessage = action.payload?.result?.message;
          state.isAuthenticated = true;
          state.userInfo = action.payload?.result?.list?.users;
          state.activeAccount = action.payload?.result?.list?.activeAccount;
        }
      })
      .addCase(switchAccount.rejected, (state, action) => {
        state.loading = false;
        state.switchAccountErrorMessage = action.payload;
        isAuthenticated = false;
      })
      .addCase(logoutIndividualAccount.pending, (state) => {
        state.loading = true;
        state.logoutIndividualAccountErrorMessage = null;
        state.logoutIndividualAccountSuccessMessage = null;
      })
      .addCase(logoutIndividualAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.success === false) {
          state.logoutIndividualAccountErrorMessage = action.payload?.result?.message;
          state.isAuthenticated = true;
        } else {
          state.logoutIndividualAccountSuccessMessage = action.payload?.result?.message;
          state.isAuthenticated = false;
          sessionStorage.clear();
          localStorage.clear();
        }
      })
      .addCase(logoutIndividualAccount.rejected, (state) => {
        state.loading = false;
        state.logoutIndividualAccountErrorMessage = action?.payload?.result?.message;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.userDetails = null;
          state.activeAccount = null;
          state.isAuthenticated = false;
        } else {
          state.userDetails = action.payload?.result?.list;
          state.activeAccount = action.payload?.result?.list?.activeAccount;
          state.isAuthenticated = true;
        }
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateIndividualProfile.pending, (state) => {
        state.loading = true;
        state.updateIndividualProfileErrorMessage = null;
      })
      .addCase(updateIndividualProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.updateIndividualProfileErrorMessage =
            action?.payload?.result?.message;
        } else {
          state.updateIndividualProfileSuccessMessage =
            action?.payload?.result?.message;
        }
      })
      .addCase(updateIndividualProfile.rejected, (state) => {
        state.loading = false;
        state.updateIndividualProfileErrorMessage =
          action?.payload?.result?.message;
      })
      .addCase(softDeleteAccount.pending, (state) => {
        state.loading = true;
        state.softDeleteIndividualErrorMessage = null;
      })
      .addCase(softDeleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.softDeleteIndividualErrorMessage =
            action.payload?.result?.message;
        } else {
          state.softDeleteIndividualSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
        }
      })
      .addCase(softDeleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.softDeleteIndividualErrorMessage = action.payload;
      })
      .addCase(recoverIndividualAccount.pending, (state) => {
        state.loading = true;
        state.recoverAccountErrorMessage = null;
      })
      .addCase(recoverIndividualAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.recoverAccountErrorMessage = action.payload?.result?.message;
        } else {
          state.recoverAccountSuccessMessage = action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(recoverIndividualAccount.rejected, (state, action) => {
        state.loading = false;
        state.recoverAccountErrorMessage = action.payload;
      })
      .addCase(deleteIndividualByAdmin.pending, (state) => {
        state.loading = true;
        state.adminDeleteIndividualErrorMessage = null;
      })
      .addCase(deleteIndividualByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.adminDeleteIndividualErrorMessage =
            action?.payload?.result?.message;
          state.adminDeleteIndividualSuccessMessage = null;
        } else {
          state.adminDeleteIndividualSuccessMessage =
            action?.payload?.result?.message;
          state.adminDeleteIndividualErrorMessage = null;
        }
      })
      .addCase(deleteIndividualByAdmin.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.deactivateAccountErrorMessage = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.deactivateAccountErrorMessage = action.payload?.result?.message;
        } else {
          state.deactivateAccountSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.deactivateAccountErrorMessage = action.payload;
      })
      .addCase(reactivateAccount.pending, (state) => {
        state.loading = true;
        state.reactivateAccountErrorMessage = null;
      })
      .addCase(reactivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.reactivateAccountErrorMessage =
            action?.payload?.result?.message;
          state.reactivateAccountSuccessMessage = null;
        } else {
          state.reactivateAccountSuccessMessage =
            action?.payload?.result?.message;
          state.reactivateAccountErrorMessage = null;
        }
      })
      .addCase(reactivateAccount.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  resetIndividualRegistrationMessage,
  resetRegisterIndividualMessage,
  resetIndividualLoginMessage,
  resetUpdateIndividualProfileMessage,
  resetIndividualLogoutMessage,
  resetSwitchAccountMessage,
  resetRecoverAccountMessage,
  resetSoftDeleteAccountMessage,
  resetAdminDeleteIndividualMessage,
  resetDeactivateAccountMessage,
  resetReactivateAccountMessage,
} = individualAuthSlice.actions;

export default individualAuthSlice.reducer;