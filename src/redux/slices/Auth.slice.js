import { createSlice } from "@reduxjs/toolkit";
// import { Cookies } from "react-cookie";
import { notify } from "../../utils/toastNotification";
import { login as loginAPI, getUserProfile } from "../actions/auth.action";
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
      .addCase(
        loginAPI.fulfilled,
        (state, { payload: { token, dispatch }, ...rest }) => {
          // console.log("fulfilled", state, rest);
          state.login.isLoading = false;
          setToken(token);
          // notify("Login success", { type: "success" });
        }
      )
      .addCase(loginAPI.pending, (state, action) => {
        state.login.isLoading = true;
      })
      .addCase(loginAPI.rejected, (state, { error }) => {
        console.log("rejected");
        state.login.isLoading = false;
      })

      // User PROFILE GET
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        // console.log("fulfilled", payload?.roles[0]);
        if (payload?.roles[0]?.role === "Agent") {
          notify("Agents can only login on the mobile app", { type: "error" });

          // Ensure clearStorage is correctly implemented or just use localStorage.clear()
          localStorage.clear(); // This will clear everything in localStorage
          return;
        }
        setAuthUser(payload);
        // notify("Login success", { type: "success" });
        window.location.href = "/dashboard";
      })

      .addCase(getUserProfile.pending, (state, action) => {
        state.login.isLoading = true;
      })
      .addCase(getUserProfile.rejected, (state, { error }) => {
        console.log("rejected");
        state.login.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
