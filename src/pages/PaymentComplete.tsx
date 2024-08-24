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
              className="flex flex-col max-w-2xl"
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
                  fontSize: "22px",
                  color: "#111",
                  textAlign: "center",
                  margin: "8px 0 16px",
                }}
              >
                Payment Completed Successfully
              </h3>

              <p
                className="text-sm text-center font-normal leading-2"
                style={{ color: "#393A4A" }}
              >
                Congratulations, you've succesfully completed the payment for
                the admission form. You will receive an SMS and/or an email with
                your username and password to login to your student portal where
                you can proceed to complete your application form
              </p>
              <p>
                <ol>{/* <li>hhhh</li> */}</ol>
              </p>
              <p className="pt-5 pb-6" style={{ fontSize: "12px" }}>
                {`Redirecting to login in ${time} s`}{" "}
              </p>

              <button
                className="font-bold rounded-md uppercase bg-orange-600 text-white p-4"
                onClick={() => navigate("/portal")}
              >
                Proceed to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentComplete;
