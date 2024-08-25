import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPayments,
  getMyPayments,
  submitPayment,
} from "../actions/payment.action";

const initialState = {
  isLoading: false,
  payments: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CLIENT LOGIN
    builder
      .addCase(submitPayment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(submitPayment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(submitPayment.rejected, (state, { error }) => {
        console.log("rejected");
        state.isLoading = false;
      });

    // GET CLIENT PAYMENTS
    builder
      .addCase(getMyPayments.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.isLoading = false;
        state.payments = payload?.payload;
      })
      .addCase(getMyPayments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMyPayments.rejected, (state, { error }) => {
        console.log("rejected");
        state.isLoading = false;
      });

    // GET ADMIN PAYMENTS
    builder
      .addCase(getAllPayments.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.isLoading = false;
        state.payments = payload?.payload;
      })
      .addCase(getAllPayments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPayments.rejected, (state, { error }) => {
        console.log("rejected");
        state.isLoading = false;
      });
  },
});

export default paymentSlice;
