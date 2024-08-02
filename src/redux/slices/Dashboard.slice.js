import { createSlice } from "@reduxjs/toolkit";
import { getMyAdmissionForm, getSingleAdmissionForm, getAllAdmissionForms } from "../actions/dashboard.action";

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    isLoading: false
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Academic Session
      .addCase(getMyAdmissionForm.fulfilled, (state, { payload }) => {
        console.log('fulfilled', payload);
        state.isLoading = false;
        state.data = [payload?.payload];
      })
      .addCase(getMyAdmissionForm.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getMyAdmissionForm.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      })

      // Academic Session
      .addCase(getSingleAdmissionForm.fulfilled, (state, { payload }) => {
        console.log('fulfilled', payload);
        state.isLoading = false;
        state.data = [payload?.payload];
      })
      .addCase(getSingleAdmissionForm.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getSingleAdmissionForm.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      })

      // Academic Session
      .addCase(getAllAdmissionForms.fulfilled, (state, { payload }) => {
        console.log('fulfilled', payload);
        state.isLoading = false;
        state.data = payload?.payload;
      })
      .addCase(getAllAdmissionForms.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getAllAdmissionForms.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      });
  },
});

export default DashboardSlice;
