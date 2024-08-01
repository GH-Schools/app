import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../actions/users.action";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isLoading: false
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Academic Session
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        console.log('fulfilled', payload);
        state.isLoading = false;
        state.data = payload?.payload ?? [];
      })

      .addCase(getUsers.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getUsers.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.isLoading = false;
      });
  },
});

export default UserSlice;
