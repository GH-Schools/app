import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   AiOutlineUser as AccountIcon,
//   AiOutlineCreditCard as PaymentIcon,
// } from "react-icons/ai";

import Lottie from "../components/common/Lottie";

import checkCircledLottie from "../assets/lotties/check_circled.lottie.json";

import "./Admissions.scss";

function PaymentComplete() {
  const navigate = useNavigate();
  const time = 20;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      navigate("/portal");
    }, time * 1000);
    return () => window.clearTimeout(timeout);
  }, [navigate]);

  return (
    <main className="flex w-full justify-center min-h-[500px] bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-[500px] max-w-[1440px] bg-white">
        <div className="flex flex-row">
          <div className="flex flex-col px-8 py-8">
            <div
              className="flex flex-col"
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                color: "#717783",
              }}
            >
              <Lottie data={checkCircledLottie} width={150} height={150} />
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#393A4A",
                  margin: "8px 0",
                }}
              >
                Payment Completed Successfully
              </h3>

              <p>
                Congratulations, you've succesfully completed the registration
                process.
              </p>
              <p>
                <ol>
                  {/* <li>hhhh</li> */}
                </ol>
              </p>
              <p
                className="pt-4 pb-6"
                style={{ color: "#393A4A", fontSize: "14px" }}
              >
                {`Redirecting to login in ${time} seconds`}{" "}
              </p>

              <button
                className="font-bold rounded-md uppercase bg-orange-600 text-white p-4"
                onClick={() => navigate("/portal")}
              >
                Go to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentComplete;
