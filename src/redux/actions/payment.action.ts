import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
import { createQuery } from "../../utils/queryUtils";
import { GenericObject } from "../../interfaces";
import { API_BASE_URL as BASE_URL } from "../../constants/urls";
import { SubmitPaymentPayload, VerifyPaymentPayload } from "../types/payment.types";
import { getToken } from "../../utils/storage";
import axios from "axios";

export const submitPayment = createAsyncThunk<any, SubmitPaymentPayload>(
  "payment/submitPayment",
  async (payload) => {
    try {
      const response: { payload: any } = await axiosServices.post(
        `/payment/success-webhook`,
        payload
      );
      console.log(response);
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const verifyPaymentByMobile = createAsyncThunk<
  any,
  Omit<VerifyPaymentPayload, "reference">
>("payment/verifyPaymentByMobile", async (payload) => {
  try {
    const response: { payload: any } = await axiosServices.post(
      `/payment/verify-payment-by-mobile`,
      payload
    );
    return response?.payload;
  } catch (error: any) {
    errorHandler(error);
    throw error;
  }
});

export const getMyPayments = createAsyncThunk<any, GenericObject>(
  "payment/getMyPayments",
  async (queryParams: GenericObject) => {
    try {
      const response: { payload: any } = await axiosServices.get(
        `/payment/get-my-payments${createQuery(queryParams)}`
      );
      return response?.payload;
    } catch (error: any) {
      errorHandler(error);
      throw error;
    }
  }
);

export const downloadPaymentReceipt = createAsyncThunk<any, GenericObject>(
  "payment/downloadPaymentReceipt",
  async (payload: GenericObject) => {
    try {
      const accessToken = getToken();

      const res = await axios.post(`${BASE_URL}/payment/download`, payload, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(res.headers["Content-Disposition"]);

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "PaymentReceipt.pdf"); //or any other extension
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