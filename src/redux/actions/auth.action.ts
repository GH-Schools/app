import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  // AUTH_URL,
  BASE_URL,
} from "../../constants/urls";
// import authAxiosService from "../../services/authAxiosService";
import axiosServices from "../../services/axiosServices";
// import { setToken } from "../../utils/storage";
import { toast } from "react-toastify";

type LoginPayload = {
  mobile: string;
  password: string;
};

export const login = createAsyncThunk<any, LoginPayload>(
  "auth/loginStatus",
  async (payload, { dispatch }) => {
    // try {
    // const config = {};
    // const response = await axios.post(`${AUTH_URL}/login`, payload, config);
    // setToken(response?.data?.token);
    // await dispatch(getUserProfile());

    // return response?.data;
    return { token: "1" };
    // } catch (error: any) {
    //   toast.error(error?.response?.data?.message);
    //   throw error;
    // }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (thunkAPI) => {
    try {
      const res: { result: any } = await axiosServices.get(`${BASE_URL}/user`);
      return res?.result?.user;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

type RegisterPayload = {};
export const registerApi = createAsyncThunk<any, RegisterPayload>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, payload);
      // console.log(response);
      return response?.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
