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

import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/UnknownPage";
import Dashboard from "./pages/Dashboard";
import Admissions from "./pages/Admissions";

import DefaultLayout from "./layouts/DefaultLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Other assets
import "react-toastify/dist/ReactToastify.min.css";
import logo from "./logo.svg";
import "./App.css";

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
            
            <Route path="/app" element={<DefaultLayout />}>
              <Route index element={<Login />} />
              <Route path="app" element={<DefaultApp />} />
              <Route path="admissions" element={<Admissions />} />
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
