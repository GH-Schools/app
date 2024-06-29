import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import TextSpinner from "../components/TextSpinner";

import { completeResetPassword } from "../redux/actions/auth.action";
import { validations } from "../utils/validations";

import logo from "../assets/favicon.png";
import "./Login.scss";
import { notify } from "../utils/toastNotification";

const CompleteResetPassword = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const schemaValidation = Yup.object({
    password: validations
      .password("Password", 6, 24)
      .required("Password is required"),
    confirmPassword: validations
      .password("Password")
      .required("Re-enter your password")
      .oneOf([Yup.ref("password"), ""], "Passwords do not match!"),
  });

  return (
    <div className="flex flex-row backdrop">
      <div className="md:w-3/5 w-full mx-auto h-screen flex flex-col justify-center">
        <Formik
          initialValues={{ confirmPassword: "", password: "" }}
          validationSchema={schemaValidation}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              const body = {
                token: "",
                password: values.password,
                confirmPassword: values.confirmPassword,
              };
              const response = await dispatch(completeResetPassword(body));
              console.log(response);
              if (response?.meta?.requestStatus === "fulfilled") {
                notify("Password reset successfully", { type: "success" });
                resetForm();
                navigate("/portal");
              }
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <img
                src={logo}
                alt="GH Schools"
                style={{
                  margin: "0 auto 1.8rem",
                  display: "block",
                  width: "15%",
                }}
              />

              <div id="login" className="form_wrapper">
                <p className="text-lg text-black font-semibold text-center">
                  Create a new password
                </p>
                <div className="form_input_wrapper password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter new password"
                    className={
                      errors.password && touched.password ? "input-error" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <div className="form_input_wrapper password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="Enter new password to confirm"
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </div>

                <div className="-mt-4 mb-6 px-1 w-full">
                  <span
                    className="inline-block text-xs uppercase font-semibold cursor-pointer"
                    style={{ color: "lightslategray" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide Password" : "Show Password"}
                  </span>
                </div>

                <div className="login-btn">
                  <button
                    type="submit"
                    className="font-semibold capitalize bg-orange-600"
                  >
                    <TextSpinner loading={isSubmitting} text="Reset Password" />
                  </button>
                </div>

                <div className="text-sm text-black text-center mt-8">
                  <span>Proceed to login to</span>{" "}
                  <a
                    href="/portal"
                    className="text-green-700 font-semibold"
                    style={{ textDecoration: "underline" }}
                  >
                    your portal
                  </a>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompleteResetPassword;
