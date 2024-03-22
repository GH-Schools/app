import React from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { login } from "../redux/actions/auth.action";

import Spinner from "../components/Spinner";

import logo from "../assets/favicon.png";
import { validations } from "../utils/validations";

import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();

  const schemaValidation = Yup.object({
    email: validations.email("Email").required("Email is required"),
    password: validations
      .password("Password", 6, 24)
      .required("Password is required"),
  });

  return (
    <div className="flex flex-row">
      <div className="md:w-3/5 w-full mx-auto h-screen flex flex-col justify-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schemaValidation}
          onSubmit={async (values, { setSubmitting }) => {
            const body = {
              email: values.email,
              password: values.password,
              source: "web",
            };
            dispatch(login(body));
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
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <img
                src={logo}
                alt="tradebuza"
                style={{
                  margin: "0 auto 1.8rem",
                  display: "block",
                  width: "15%",
                }}
              />

              <div id="login" className="form_wrapper">
                <p className="text-xl text-black font-bold text-center">
                  Sign In
                </p>
                <div className="form_input_wrapper">
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email address..."
                    className={
                      errors.email && touched.email ? "input-error" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="form_input_wrapper password-input">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    className={
                      errors.password && touched.password ? "input-error" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <div className="login-btn ">
                  <button
                    type="submit"
                    className="font-bold uppercase bg-orange-600"
                  >
                    {isSubmitting ? (
                      <Spinner size={20} color="secondary" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <div className="mt-4">
                  <a href="#e">Forgot Password?</a>
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
