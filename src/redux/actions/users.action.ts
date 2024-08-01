import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../../interfaces";

import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
import { createQuery } from "../../utils/queryUtils";

export const getUsers = createAsyncThunk<any, GenericObject>(
  "user/getUsers",
  async (queryParams: GenericObject = {}) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/user/get-users${createQuery(queryParams)}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

// export default AppSlice.actions
