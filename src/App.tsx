import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  // Redirect
} from "react-router-dom";

import { ToastContainer as DefaultToastContainer } from "react-toastify";

// Import Contexts
// import { theme, ThemeProvider } from "./context/ThemeProvider";
import SuspenseFallback from "./components/SuspenseFallback";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";

// LAYOUTS
import DefaultLayout from "./layouts/DefaultLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Other assets
import "react-toastify/dist/ReactToastify.min.css";
import logo from "./logo.svg";
import "./App.css";

// PAGES
const Home =  React.lazy(() => import("./pages/Home"));
const Login =  React.lazy(() => import("./pages/Login"));
const NoPage =  React.lazy(() => import("./pages/UnknownPage"));
const Admissions =  React.lazy(() => import("./pages/Admissions"));
const ResetPassword =  React.lazy(() => import("./pages/ResetPassword"));
const Dashboard =  React.lazy(() => import("./pages/dashboard/Dashboard"));
const PaymentComplete =  React.lazy(() => import("./pages/PaymentComplete"));
const Application =  React.lazy(() => import("./pages/dashboard/Application"));
const CompleteResetPassword =  React.lazy(() => import("./pages/CompleteResetPassword"));
const ViewPaymentReceipt = React.lazy(() => import( "./pages/dashboard/ViewPaymentReceipt"));

// create a default container so we can override the styles
const ToastContainer = (props: any) => (
  <DefaultToastContainer style={{ zIndex: "1900" }} {...props} />
);

const DefaultApp = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<SuspenseFallback />}>
        <Router>
          <Switch>
            <Route path="/" element={<Home />} />
            
            <Route path="/portal" element={<DefaultLayout />}>
              <Route index element={<Login />} />
              <Route path="password/reset" element={<ResetPassword />} />
              <Route path="password/create-new" element={<CompleteResetPassword />} />
              <Route path="app" element={<DefaultApp />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="admissions/payment-success" element={<PaymentComplete />} />
            </Route>

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="apply/form" element={<Application />} />
              <Route path="payment/view-receipt" element={<ViewPaymentReceipt />} />
            </Route>

            <Route path="*" element={<NoPage />} />
          </Switch>
        </Router>
        <ToastContainer />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
