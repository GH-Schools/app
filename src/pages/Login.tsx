import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import TextSpinner from "../components/TextSpinner";

import { login } from "../redux/actions/auth.action";
import { validations } from "../utils/validations";

import logo from "../assets/favicon.png";
import "./Login.scss";
import { mergeClassNames } from "../utils/utilities";

const Login = () => {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const schemaValidation = Yup.object({
    mobile: validations.mobile("Mobile").required("Mobile is required"),
    password: validations
      .password("Password", 6, 24)
      .required("Password is required"),
  });

  return (
    <div className="flex flex-row backdrop">
      <div className="md:w-3/5 w-full mx-auto h-screen flex flex-col justify-center">
        <Formik
          initialValues={{ mobile: "", password: "" }}
          validationSchema={schemaValidation}
          onSubmit={async (values, { setSubmitting }) => {
            const body = {
              mobile: values.mobile,
              password: values.password,
              source: "web",
            };
            const response = await dispatch(login(body));
            console.log(response);
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
            <form
              className="flex md:flex-row flex-col items-center justify-between"
              onSubmit={handleSubmit}
            >
              <div id="login" className="form_wrapper">
                <img
                  src={logo}
                  alt="GH Schools"
                  className="w-[100px] md:w-[120px]"
                  style={{
                    margin: "0 auto 1.5rem",
                    display: "block",
                    // width: "15%",
                  }}
                />
                <div className="flex flex-col">
                  <p className="text-lg text-black font-semibold text-center w-full">
                    Sign In To Portal
                  </p>

                  <div className="form_input_wrapper">
                    <input
                      type="tel"
                      name="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      placeholder="Enter mobile number"
                      className={mergeClassNames(
                        "border",
                        errors.mobile && touched.mobile ? "input-error" : ""
                      )}
                    />
                    {errors.mobile && touched.mobile && (
                      <span className="error">{errors.mobile}</span>
                    )}
                  </div>

                  <div className="form_input_wrapper password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className={mergeClassNames(
                        "border",
                        errors.password && touched.password ? "input-error" : ""
                      )}
                    />
                    {errors.password && touched.password && (
                      <span className="error">{errors.password}</span>
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
                      className="font-semibold uppercase bg-orange-600"
                    >
                      <TextSpinner loading={isSubmitting} text="Login" />
                    </button>
                  </div>

                  <div className="text-xs font-semibold uppercase text-gray-600 text-center mt-8">
                    <span>Can't remember login?</span>{" "}
                    <a
                      href="/portal/password/reset"
                      className="text-green-700"
                      style={{ textDecoration: "underline" }}
                    >
                      Reset Password
                    </a>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
