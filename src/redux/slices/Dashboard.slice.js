import { createSlice } from "@reduxjs/toolkit";
import {
  getMyAdmissionForm,
  getSingleAdmissionForm,
  getAllAdmissionForms,
  getAllMetrics,
} from "../actions/dashboard.action";

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    metrics: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Academic Session
      .addCase(getMyAdmissionForm.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.data = [payload?.payload];
      })
      .addCase(getMyAdmissionForm.pending, (state, action) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(getMyAdmissionForm.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      })

      // Academic Session
      .addCase(getSingleAdmissionForm.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.data = [payload?.payload];
      })
      .addCase(getSingleAdmissionForm.pending, (state, action) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(getSingleAdmissionForm.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      })

      // Academic Session
      .addCase(getAllAdmissionForms.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.data = payload?.payload;
      })
      .addCase(getAllAdmissionForms.pending, (state, action) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(getAllAdmissionForms.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      })

      // Metrics
      .addCase(getAllMetrics.fulfilled, (state, { payload }) => {
        console.log("fulfilled", payload);
        state.isLoading = false;
        state.metrics = payload?.payload ?? {};
      })
      .addCase(getAllMetrics.pending, (state, action) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(getAllMetrics.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      });
  },
});

export default DashboardSlice;
