import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    menuSelected: -1,
    states: {},
    localGovt: [],
    permissions: [],
  },
  reducers: {
    setCurrentDrawerMenu(state, action) {
      // console.log(state, action);
      localStorage.setItem("menuSelected", action.payload);

      return {
        ...state,
        menuSelected: action.payload
      }
    }
  },
});

export default AppSlice;