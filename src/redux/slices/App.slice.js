import { createSlice } from "@reduxjs/toolkit";
import { getCurrentSession } from "../actions/app.action";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    menuSelected: -1,
    states: {},
    localGovt: [],
    permissions: [],
    sessionInfo: {
      loading: false,
      data: null,
    },
  },
  reducers: {
    setCurrentDrawerMenu(state, action) {
      // console.log(state, action);
      localStorage.setItem("menuSelected", action.payload);

      return {
        ...state,
        menuSelected: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      // Academic Session
      .addCase(getCurrentSession.fulfilled, (state, { payload }) => {
        console.log('fulfilled');
        state.sessionInfo.loading = false;
        state.sessionInfo.data = payload;
      })

      .addCase(getCurrentSession.pending, (state, action) => {
        console.log('pending');
        state.sessionInfo.loading = true;
      })
      .addCase(getCurrentSession.rejected, (state, { error }) => {
        console.log("rejected", error);
        state.sessionInfo.loading = false;
      });
  },
});

export default AppSlice;
