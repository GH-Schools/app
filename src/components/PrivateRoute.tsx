import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthUser } from "../utils/storage";

const PrivateRoute = ({ children }: any) => {
  //   const isAuthenticated = localStorage.getItem("access_token");
  const isAuthenticated = JSON.parse(getAuthUser());
  const location = useLocation();

  // if (!isAuthenticated) {
  //   // Redirect them to the /login page, but save the current location they were
  //   // trying to go to when they were redirected. This allows us to send them
  //   // along to that page after they log in, which is a nicer user experience
  //   // than dropping them off on the home page.
  //   localStorage.clear();
  //   return <Navigate replace to="/" state={{ from: location }} />;
  // }

  return children;
};

export default PrivateRoute;
