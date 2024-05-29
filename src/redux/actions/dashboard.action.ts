import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../../interfaces";

// import AppSlice from "../slices/App.slice";
import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
import { createQuery } from "../../utils/createQuery";

export const submitAdmissionForm = createAsyncThunk(
  "dashboard/submitAdmissionForm",
  async (thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.get(`/admissions/new-form`);
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getMyAdmissionForm = createAsyncThunk<any, GenericObject>(
  "dashboard/getMyAdmissionForm",
  async (queryParams: GenericObject) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/admissions/get-admissions-form${createQuery(queryParams)}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

// export default AppSlice.actions
