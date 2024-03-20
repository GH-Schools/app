import authSlice from "../slices/Auth.slice";
import AppSlice from "../slices/App.slice";

export const reducers = {
  Auth: authSlice.reducer,
  App: AppSlice.reducer,
};
