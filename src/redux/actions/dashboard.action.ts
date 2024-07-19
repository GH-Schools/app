import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../../interfaces";

// import AppSlice from "../slices/App.slice";
import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
// import { createQuery } from "../../utils/createQuery";

export const saveAdmissionPersonalProfile = createAsyncThunk(
  "dashboard/saveAdmissionPersonalProfile",
  async (payload: GenericObject, thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.post(
        `/admissions/save-personal-profile`,
        payload
      );
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const saveAdmissionEducation = createAsyncThunk(
  "dashboard/saveAdmissionEducation",
  async (payload: GenericObject, thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.post(
        `/admissions/save-education`,
        payload
      );
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const saveAdmissionWelfareInformation = createAsyncThunk(
  "dashboard/saveAdmissionWelfareInformation",
  async (payload: GenericObject, thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.post(
        `/admissions/save-welfare-information`,
        payload
      );
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getMyAdmissionForm = createAsyncThunk<any, string>(
  "dashboard/getMyAdmissionForm",
  async (sessionId: string) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/admissions/get-admissions-form/${sessionId}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

// export default AppSlice.actions
