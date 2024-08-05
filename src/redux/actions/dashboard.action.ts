import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../../interfaces";

// import AppSlice from "../slices/App.slice";
import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
import { createQuery } from "../../utils/queryUtils";
import { API_BASE_URL as BASE_URL } from "../../constants/urls";
import { getToken } from "../../utils/storage";

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

export const updateAdmissionForm = createAsyncThunk(
  "dashboard/updateAdmissionForm",
  async (payload: GenericObject, thunkAPI) => {
    try {
      const res: { payload: any } = await axiosServices.put(
        `/admissions/update-form`,
        payload
      );
      return res?.payload?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getMyAdmissionForm = createAsyncThunk<
  any,
  { userId: string; silent?: boolean }
>(
  "dashboard/getMyAdmissionForm",
  async ({ userId, silent }: { userId: string; silent?: boolean }) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/admissions/get-admissions-form/${userId}`
      );
      return response?.payload;
    } catch (error: any) {
      if (!silent) {
        errorHandler(error);
        throw error;
      } else {
        console.error(error);
      }
    }
  }
);

export const getSingleAdmissionForm = createAsyncThunk<any, string>(
  "dashboard/getSingleAdmissionForm",
  async (formId: string) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/admissions/get-admissions-form/${formId}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const getAllAdmissionForms = createAsyncThunk<any, GenericObject>(
  "dashboard/getAllAdmissionForms",
  async (queryParams: GenericObject = {}) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/admissions/get-all-forms${createQuery(queryParams)}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const downloadAdmissionForm = createAsyncThunk<any, GenericObject>(
  "dashboard/downloadAdmissionForm",
  async (payload: GenericObject) => {
    try {
      const accessToken = getToken();

      const res = await axios.post(`${BASE_URL}/admissions/download`, payload, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(res.headers["Content-Disposition"]);

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "AdmissionForm.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // cleanup
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

// export default AppSlice.actions
