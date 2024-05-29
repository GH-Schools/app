import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setToken } from "../../utils/storage";
import { errorHandler } from "../errorHandler";
import {
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  CompleteResetPasswordPayload
} from "../types/auth.types";
import axiosService from "../../services/axiosServices";

export const login = createAsyncThunk<any, LoginPayload>(
  "auth/loginStatus",
  async (payload, { dispatch }) => {
    try {
      const response: { data: { payload: any } } = await axiosService.post(
        `/auth/login`,
        payload
      );
      // console.log('auth', response);
      setToken(response?.data?.payload?.token);
      await dispatch(getUserProfile());

      return response?.data?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk<any, ResetPasswordPayload>(
  "auth/resetPassword",
  async (payload, { dispatch }) => {
    try {
      const response: { data: { payload: any } } = await axiosService.post(
        `/auth/reset-password`,
        payload
      );

      return response?.data?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const completeResetPassword = createAsyncThunk<any, CompleteResetPasswordPayload>(
  "auth/completeResetPassword",
  async (payload, { dispatch }) => {
    try {
      const response: { data: { payload: any } } = await axiosService.post(
        `/auth/reset-password`,
        payload
      );

      return response?.data?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (thunkAPI) => {
    try {
      const res: { payload: any } = await axiosService.get(`/get-profile`);
      return res?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const registerApi = createAsyncThunk<any, RegisterPayload>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosService.post(`/auth/register`, payload);
      // console.log(response);
      return response?.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
