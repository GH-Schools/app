import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosServices from "../../services/axiosServices";
import { errorHandler } from "../errorHandler";
import { createQuery } from "../../utils/queryUtils";
import { GenericObject } from "../../interfaces";
import { SubmitPaymentPayload, VerifyPaymentPayload } from "../types/payment.types";

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
