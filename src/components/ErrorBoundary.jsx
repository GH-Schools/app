import React, { Component } from "react";
import Header from "./Header";
// import Lottie from "./common/Lottie";
import { PiLinkBreakBold as BreakIcon } from "react-icons/pi";

import Button from "./common/Button";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught Error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <div
            className="flex flex-col justify-center items-center mt-8"
            style={{ width: "100%", height: "calc(98vh - 100px)" }}
          >
            <div className="flex flex-row items-center mt-8">
              {/* <Lottie data={noSearchAnimation} width={100} height={100} /> */}
              <BreakIcon fontSize={"58px"} style={{ marginRight: "10px" }} />
              <h1
                className="font-bold my-0"
                style={{
                  fontSize: "50px",
                  margin: 0,
                  letterSpacing: "1px",
                  lineHeight: 1,
                }}
              >
                Snap!
              </h1>
            </div>

            <h2
              className="text-center mt-4"
              style={{
                fontSize: "1rem",
                maxWidth: "620px",
                paddingLeft: "1.5rem",
              }}
            >
              A serious error seems to have occured. Please try refreshing the
              page or{" "}
              <a
                className=""
                href="mailto:admissions@ghschools.online"
                style={{ color: "#009688", textDecoration: "underline" }}
              >
                contact support
              </a>{" "}
              if error persists.
            </h2>
            <Button
              href="/student/dashboard"
              text="Return To Dashboard"
              style={{
                fontSize: "14px",
                fontWeight: 700,
                padding: "8px 16px",
                margin: "35px auto 0",
                boxShadow: "none",
                borderRadius: "8px",
                color: "white",
                width: "220px",
              }}
            />
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
