import { createSlice } from "@reduxjs/toolkit";
import { getSingleSchedule, getAllSchedules } from "../actions/schedule.action";

const ScheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    data: [],
    isLoading: false
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Academic Session
      .addCase(getSingleSchedule.fulfilled, (state, { payload }) => {
        console.log('fulfilled', payload);
        state.isLoading = false;
        state.data = [payload?.payload];
      })
      .addCase(getSingleSchedule.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getSingleSchedule.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      })

      // Academic Session
      .addCase(getAllSchedules.fulfilled, (state, { payload }) => {
        console.log('fulfilled', payload);
        state.isLoading = false;
        state.data = payload?.payload;
      })
      .addCase(getAllSchedules.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getAllSchedules.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      });
  },
});

export default ScheduleSlice;
