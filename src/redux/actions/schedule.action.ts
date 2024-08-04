import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../../interfaces";

// import AppSlice from "../slices/App.slice";
import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
import { createQuery } from "../../utils/queryUtils";

export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (payload: GenericObject, thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.post(
        `/schedules/create-schedule`,
        payload
      );
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async (payload: GenericObject, thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.put(
        `/schedules/update-form`,
        payload
      );
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getSingleSchedule = createAsyncThunk<any, string>(
  "schedule/getSingleSchedule",
  async (eventId: string) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/schedules/${eventId}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getAllSchedules = createAsyncThunk<any, GenericObject>(
  "schedule/getAllSchedules",
  async (queryParams: GenericObject = {}) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/schedules${createQuery(queryParams)}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

// export default AppSlice.actions
