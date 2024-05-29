import { createAsyncThunk } from "@reduxjs/toolkit";

// import AppSlice from "../slices/App.slice";
import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";

export const getCurrentSession = createAsyncThunk(
  "app/getCurrentSession",
  async (thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.get(`/session/get-current-session`);
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

// export default AppSlice.actions
