import axios from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setToken } from "../../utils/storage";
import { API_BASE_URL } from "../../constants/urls";
import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../../utils/actionsErrorHandler";
// import authAxiosService from "../../services/authAxiosService";

type LoginPayload = {
  mobile: string;
  password: string;
};

export const login = createAsyncThunk<any, LoginPayload>(
  "auth/loginStatus",
  async (payload, { dispatch }) => {
    try {
      const config = {};
      const response: { data: { payload: any } } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        payload,
        config
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

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.get(`/get-profile`);
      return res?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

type RegisterPayload = {};

export const registerApi = createAsyncThunk<any, RegisterPayload>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const config = {};
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        payload,
        config
      );
      // console.log(response);
      return response?.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
