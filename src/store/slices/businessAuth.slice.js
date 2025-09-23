import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "@/common/Hooks/fetchAPI";

export const registerBusinessUser = createAsyncThunk(
  "business/auth/registerBusinessUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/registerBusinessUser`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const registerBusiness = createAsyncThunk(
  "business/auth/registerBusiness",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/registerBusiness`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "business/auth/updateUserDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/updateUserDetails`,
        method: "PUT",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const updateBusinessProfile = createAsyncThunk(
  "business/auth/updateBusinessProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/updateBusinessProfile`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const loginBusinessUser = createAsyncThunk(
  "business/auth/loginBusinessUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/loginBusinessUser`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const switchBusinessAccount = createAsyncThunk(
  "business/auth/switchBusinessAccount",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/switchBusinessAccount`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const logoutBusinessUser = createAsyncThunk(
  "business/auth/logoutBusinessUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/logoutBusinessUser`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "business/auth/changePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/changePassword`,
        method: "PATCH",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const sendForgotPasswordLink = createAsyncThunk(
  "business/auth/sendForgotPasswordLink",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/sendForgotPasswordLink`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "business/auth/forgotPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/forgotPassword`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  "business/auth/deactivateAccount",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/deactivateAccount`,
        method: "PATCH",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const softDeleteBusiness = createAsyncThunk(
  "business/auth/softDeleteBusiness",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/softDeleteBusiness`,
        method: "DELETE",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const recoverBusinessAccount = createAsyncThunk(
  "business/auth/recoverBusinessAccount",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/recoverBusinessAccount`,
        method: "PATCH",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const permanentDeleteBusiness = createAsyncThunk(
  "business/auth/permanentDeleteBusiness",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/permanentDeleteBusiness`,
        method: "DELETE",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "business/user/getUserDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/user/getUserDetails`,
        method: "POST",
        body: formData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteBusinessByAdmin = createAsyncThunk(
  "/business/auth/deleteBusinessByAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/deleteBusinessByAdmin`,
        method: "DELETE",
        body: payload,
      });

      return response;
    } catch (error) {
      rejectWithValue(error?.data?.result?.message || error?.message);
    }
  }
);

export const reactivateAccount = createAsyncThunk(
  "/business/auth/reactivateAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/auth/reactivateAccount`,
        method: "POST",
        body: payload,
      });

      return response;
    } catch (error) {
      rejectWithValue(error?.data?.result?.message || error?.message);
    }
  }
);

const authSlice = createSlice({
  name: "businessAuth",
  initialState: {
    userInfo: null,
    loading: false,
    isAuthenticated: false,
    activeAccount: null,
    userDetails: null,
    userErrorData: null,
    registerBusinessUserSuccessMessage: null,
    registerBusinessUserErrorMessage: null,
    registerBusinessSuccessMessage: null,
    registerBusinessErrorMessage: null,
    updateUserProfileSuccessMessage: null,
    updateUserProfileErrorMessage: null,
    updateBusinessProfileSuccessMessage: null,
    updateBusinessProfileErrorMessage: null,
    loginBusinessUserSuccessMessage: null,
    loginBusinessUserErrorMessage: null,
    switchBusinessAccountSuccessMessage: null,
    switchBusinessAccountErrorMessage: null,
    logoutBusinessUserSuccessMessage: null,
    logoutBusinessUserErrorMessage: null,
    changePasswordSuccessMessage: null,
    changePasswordErrorMessage: null,
    forgotPasswordSuccessMessage: null,
    forgotPasswordErrorMessage: null,
    sendForgotPasswordLinkSuccessMessage: null,
    sendForgotPasswordLinkErrorMessage: null,
    deactivateAccountSuccessMessage: null,
    deactivateAccountErrorMessage: null,
    recoverBusinessAccountSuccessMessage: null,
    recoverBusinessAccountErrorMessage: null,
    permanentDeleteBusinessSuccessMessage: null,
    permanentDeleteBusinessErrorMessage: null,
    softDeleteBusinessSuccessMessage: null,
    softDeleteBusinessErrorMessage: null,
    adminDeleteBusinessSuccessMessage: null,
    adminDeleteBusinessErrorMessage: null,
    reactivateAccountSuccessMessage: null,
    reactivateAccountErrorMessage: null,
  },
  reducers: {
    resetBusinessRegistrationMessage: (state) => {
      state.registerBusinessUserSuccessMessage = null;
      state.registerBusinessUserErrorMessage = null;
    },
    resetRegisterBusinessMessage: (state) => {
      state.registerBusinessSuccessMessage = null;
      state.registerBusinessErrorMessage = null;
    },
    resetUpdateUserProfileMessage: (state) => {
      state.updateUserProfileSuccessMessage = null;
      state.updateUserProfileErrorMessage = null;
    },
    resetUpdateBusinessProfileMessage: (state) => {
      state.updateBusinessProfileSuccessMessage = null;
      state.updateBusinessProfileErrorMessage = null;
    },
    resetBusinessLoginMessage: (state) => {
      state.loginBusinessUserSuccessMessage = null;
      state.loginBusinessUserErrorMessage = null;
    },
    resetSwitchBusinessAccountMessage: (state) => {
      state.switchBusinessAccountSuccessMessage = null;
      state.switchBusinessAccountErrorMessage = null;
    },
    resetLogoutBusinessUserMessage: (state) => {
      state.logoutBusinessUserSuccessMessage = null;
      state.logoutBusinessUserErrorMessage = null;
    },
    resetChangePasswordMessage: (state) => {
      state.changePasswordSuccessMessage = null;
      state.changePasswordErrorMessage = null;
    },
    resetForgotPasswordMessage: (state) => {
      state.forgotPasswordSuccessMessage = null;
      state.forgotPasswordErrorMessage = null;
    },
    resetSendForgotPasswordLinkMessage: (state) => {
      state.sendForgotPasswordLinkSuccessMessage = null;
      state.sendForgotPasswordLinkErrorMessage = null;
    },
    resetDeactivateAccountMessage: (state) => {
      state.deactivateAccountSuccessMessage = null;
      state.deactivateAccountErrorMessage = null;
    },
    resetRecoverBusinessAccountMessage: (state) => {
      state.recoverBusinessAccountSuccessMessage = null;
      state.recoverBusinessAccountErrorMessage = null;
    },
    resetPermanentDeleteBusinessMessage: (state) => {
      state.permanentDeleteBusinessSuccessMessage = null;
      state.permanentDeleteBusinessErrorMessage = null;
    },
    resetSoftDeleteBusinessMessage: (state) => {
      state.softDeleteBusinessSuccessMessage = null;
      state.softDeleteBusinessErrorMessage = null;
    },
    resetAdminDeleteBusinessMessage: (state) => {
      state.adminDeleteBusinessSuccessMessage = null;
      state.adminDeleteBusinessErrorMessage = null;
    },
    resetReactivateAccountMessage: (state) => {
      state.reactivateAccountSuccessMessage = null;
      state.reactivateAccountErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerBusinessUser.pending, (state) => {
        state.loading = true;
        state.registerBusinessUserErrorMessage = null;
      })
      .addCase(registerBusinessUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.registerBusinessUserErrorMessage =
            action.payload?.result?.message;
        } else {
          state.registerBusinessUserSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = false;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(registerBusinessUser.rejected, (state, action) => {
        state.loading = false;
        state.registerBusinessUserErrorMessage = action.payload;
      })
      .addCase(registerBusiness.pending, (state) => {
        state.loading = true;
        state.registerBusinessErrorMessage = null;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.registerBusinessErrorMessage = action.payload?.result?.message;
        } else {
          state.registerBusinessSuccessMessage =
            action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.registerBusinessErrorMessage = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.updateUserProfileErrorMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.updateUserProfileErrorMessage = action.payload?.result?.message;
        } else {
          state.updateUserProfileSuccessMessage =
            action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.updateUserProfileErrorMessage = action.payload;
      })
      .addCase(updateBusinessProfile.pending, (state) => {
        state.loading = true;
        state.updateBusinessProfileErrorMessage = null;
      })
      .addCase(updateBusinessProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.updateBusinessProfileErrorMessage =
            action.payload?.result?.message;
        } else {
          state.updateBusinessProfileSuccessMessage =
            action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(updateBusinessProfile.rejected, (state, action) => {
        state.loading = false;
        state.updateBusinessProfileErrorMessage = action.payload;
      })
      .addCase(loginBusinessUser.pending, (state) => {
        state.loading = true;
        state.loginBusinessUserErrorMessage = null;
      })
      .addCase(loginBusinessUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.loginBusinessUserErrorMessage = action.payload?.result?.message;
          state.isAuthenticated = false;
          state.userErrorData = action.payload?.result?.list;
        } else {
          state.loginBusinessUserSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
          state.userErrorData = null;
          state.userInfo = action.payload?.result?.list?.user;
          state.activeAccount = action.payload?.result?.list?.activeAccount;
        }
      })
      .addCase(loginBusinessUser.rejected, (state, action) => {
        state.loading = false;
        state.loginBusinessUserErrorMessage = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(switchBusinessAccount.pending, (state) => {
        state.loading = true;
        state.switchBusinessAccountErrorMessage = null;
      })
      .addCase(switchBusinessAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.switchBusinessAccountErrorMessage =
            action.payload?.result?.message;
          state.isAuthenticated = false;
        } else {
          state.switchBusinessAccountSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
          state.userInfo = action.payload?.result?.list?.users;
          state.activeAccount = action.payload?.result?.list?.activeAccount;
        }
      })
      .addCase(switchBusinessAccount.rejected, (state, action) => {
        state.loading = false;
        state.switchBusinessAccountErrorMessage = action.payload;
        isAuthenticated = false;
      })
      .addCase(logoutBusinessUser.pending, (state) => {
        state.loading = true;
        state.logoutBusinessUserErrorMessage = null;
      })
      .addCase(logoutBusinessUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.logoutBusinessUserErrorMessage = action.payload?.result?.message;
        } else {
          state.logoutBusinessUserSuccessMessage = action.payload?.result?.message;
          state.isAuthenticated = false;
          state.userInfo = null;
          sessionStorage.clear();
          localStorage.clear();
        }
      })
      .addCase(logoutBusinessUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.logoutBusinessUserErrorMessage = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.changePasswordErrorMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.changePasswordErrorMessage = action.payload?.result?.message;
        } else {
          state.changePasswordSuccessMessage = action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.changePasswordErrorMessage = action.payload;
      })
      .addCase(sendForgotPasswordLink.pending, (state) => {
        state.loading = true;
        state.sendForgotPasswordLinkErrorMessage = null;
      })
      .addCase(sendForgotPasswordLink.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.sendForgotPasswordLinkErrorMessage =
            action.payload?.result?.message;
        } else {
          state.sendForgotPasswordLinkSuccessMessage =
            action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(sendForgotPasswordLink.rejected, (state, action) => {
        state.loading = false;
        state.sendForgotPasswordLinkErrorMessage = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.forgotPasswordErrorMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.forgotPasswordErrorMessage = action.payload?.result?.message;
        } else {
          state.forgotPasswordSuccessMessage = action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgotPasswordErrorMessage = action.payload;
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
      .addCase(softDeleteBusiness.pending, (state) => {
        state.loading = true;
        state.softDeleteBusinessErrorMessage = null;
      })
      .addCase(softDeleteBusiness.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.softDeleteBusinessErrorMessage =
            action.payload?.result?.message;
        } else {
          state.softDeleteBusinessSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = true;
        }
      })
      .addCase(softDeleteBusiness.rejected, (state, action) => {
        state.loading = false;
        state.softDeleteBusinessErrorMessage = action.payload;
      })
      .addCase(recoverBusinessAccount.pending, (state) => {
        state.loading = true;
        state.recoverBusinessAccountErrorMessage = null;
      })
      .addCase(recoverBusinessAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.recoverBusinessAccountErrorMessage =
            action.payload?.result?.message;
        } else {
          state.recoverBusinessAccountSuccessMessage =
            action.payload?.result?.message;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(recoverBusinessAccount.rejected, (state, action) => {
        state.loading = false;
        state.recoverBusinessAccountErrorMessage = action.payload;
      })
      .addCase(permanentDeleteBusiness.pending, (state) => {
        state.loading = true;
        state.permanentDeleteBusinessErrorMessage = null;
      })
      .addCase(permanentDeleteBusiness.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.permanentDeleteBusinessErrorMessage =
            action.payload?.result?.message;
        } else {
          state.permanentDeleteBusinessSuccessMessage =
            action.payload?.result?.message;
          state.isAuthenticated = false;
          state.userInfo = action.payload?.result?.list;
        }
      })
      .addCase(permanentDeleteBusiness.rejected, (state, action) => {
        state.loading = false;
        state.permanentDeleteBusinessErrorMessage = action.payload;
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
        }
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteBusinessByAdmin.pending, (state) => {
        state.loading = true;
        state.adminDeleteBusinessErrorMessage = null;
      })
      .addCase(deleteBusinessByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.success === false) {
          state.adminDeleteBusinessErrorMessage =
            action?.payload?.result?.message;
          state.adminDeleteBusinessSuccessMessage = null;
        } else {
          state.adminDeleteBusinessSuccessMessage =
            action?.payload?.result?.message;
          state.adminDeleteBusinessErrorMessage = null;
        }
      })
      .addCase(deleteBusinessByAdmin.rejected, (state) => {
        state.loading = false;
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
  resetBusinessRegistrationMessage,
  resetRegisterBusinessMessage,
  resetUpdateUserProfileMessage,
  resetUpdateBusinessProfileMessage,
  resetBusinessLoginMessage,
  resetSwitchBusinessAccountMessage,
  resetLogoutBusinessUserMessage,
  resetChangePasswordMessage,
  resetForgotPasswordMessage,
  resetSendForgotPasswordLinkMessage,
  resetDeactivateAccountMessage,
  resetRecoverBusinessAccountMessage,
  resetPermanentDeleteBusinessMessage,
  resetSoftDeleteBusinessMessage,
  resetAdminDeleteBusinessMessage,
  resetReactivateAccountMessage,
} = authSlice.actions;

export default authSlice.reducer;