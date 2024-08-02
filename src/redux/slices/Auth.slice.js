import { createSlice } from "@reduxjs/toolkit";
import { notify } from "../../utils/toastNotification";
import {
  login as loginAPI,
  adminLogin,
  getUserProfile,
} from "../actions/auth.action";
import {
  clearStorage,
  getAuthUser,
  getToken,
  setAuthUser,
  setToken,
} from "../../utils/storage";

const initialState = {
  accessToken: getToken(),
  userProfile: getAuthUser(),
  isLoading: false,
  login: {
    isLoading: false,
  },
  register: {
    isLoading: false,
  },
  createPassword: {
    isLoading: false,
  },
  forgotPassword: {
    isLoading: false,
  },
  resetPassword: {
    isLoading: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.userProfile = {};
      window.location.href = "/";
      clearStorage();
    },
  },
  extraReducers: (builder) => {
    // CLIENT LOGIN
    builder
      .addCase(loginAPI.fulfilled, (state, { payload: { token } }) => {
        // HeEnu0Wq
        // console.log("fulfilled", token);
        state.login.isLoading = false;
        notify("Login success", { type: "success" });
        if (token) {
          setToken(token);
          window.location.href = "/student/dashboard";
        }
      })
      .addCase(loginAPI.pending, (state, action) => {
        state.login.isLoading = true;
      })
      .addCase(loginAPI.rejected, (state, { error }) => {
        console.log("rejected");
        state.login.isLoading = false;
      })

      // User PROFILE GET
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        console.log(payload);
        setAuthUser(payload);
        state.userProfile = payload;
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.login.isLoading = true;
      })
      .addCase(getUserProfile.rejected, (state, { error }) => {
        console.log("rejected");
        state.login.isLoading = false;
      })

      // Admin login
      .addCase(adminLogin.fulfilled, (state, { payload: { token } }) => {
        // console.log("fulfilled", token);
        state.login.isLoading = false;
        notify("Login success", { type: "success" });
        if (token) {
          setToken(token);
          window.location.href = "/admin/dashboard";
        }
      })
      .addCase(adminLogin.pending, (state, action) => {
        state.login.isLoading = true;
      })
      .addCase(adminLogin.rejected, (state, { error }) => {
        console.log("rejected");
        state.login.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
