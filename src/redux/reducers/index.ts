import AppSlice from "../slices/App.slice";
import authSlice from "../slices/Auth.slice";
import userSlice from "../slices/User.slice";
import paymentSlice from "../slices/Payment.slice";
import dashboardSlice from "../slices/Dashboard.slice";
import scheduleSlice from "../slices/Schedule.slice";
import { GenericObject } from "../../interfaces";

export type StoreState = {
  Auth: {
    login: { isLoading: boolean };
    userProfile: GenericObject;
  };
  App: { sessionInfo: { loading: boolean; data: GenericObject } };
  Payment: {
    isLoading: boolean;
    payments: GenericObject[];
  };
  Dashboard: {
    isLoading: boolean;
    data: GenericObject[];
  };
  Schedule: {
    isLoading: boolean;
    data: GenericObject[];
  };
  User: {
    isLoading: boolean;
    data: GenericObject[];
  };
};

export const reducers = {
  App: AppSlice.reducer,
  Auth: authSlice.reducer,
  User: userSlice.reducer,
  Payment: paymentSlice.reducer,
  Dashboard: dashboardSlice.reducer,
  Schedule: scheduleSlice.reducer
};
