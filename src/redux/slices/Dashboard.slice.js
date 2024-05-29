import { createSlice } from "@reduxjs/toolkit";
import { getMyAdmissionForm } from "../actions/dashboard.action";

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
        console.log('fulfilled');
        state.isLoading = false;
        state.data = payload;
      })

      .addCase(getMyAdmissionForm.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getMyAdmissionForm.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      });
  },
});

export default DashboardSlice;
