import authSlice from "../slices/Auth.slice";
import AppSlice from "../slices/App.slice";
import paymentSlice from "../slices/Payment.slice";
import { GenericObject } from "../../interfaces";

export type StoreState = {
  Auth: {
    login: { isLoading: boolean };
    userProfile: {
      [x: string]: any;
    };
  };
  App: { sessionInfo: { loading: boolean; data: any } };
  Payment: {
    isLoading: boolean,
    payments: GenericObject[]
  };
};

export const reducers = {
  Auth: authSlice.reducer,
  App: AppSlice.reducer,
  Payment: paymentSlice.reducer,
};
