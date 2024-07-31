import authSlice from "../slices/Auth.slice";
import AppSlice from "../slices/App.slice";
import paymentSlice from "../slices/Payment.slice";
import dashboardSlice from "../slices/Dashboard.slice";
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
};

export const reducers = {
  App: AppSlice.reducer,
  Auth: authSlice.reducer,
  Payment: paymentSlice.reducer,
  Dashboard: dashboardSlice.reducer,
};
