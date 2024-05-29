import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import TextSpinner from "../components/TextSpinner";

import { resetPassword } from "../redux/actions/auth.action";
import { validations } from "../utils/validations";

import logo from "../assets/favicon.png";
import "./Login.scss";
import { notify } from "../utils/toastNotification";

const ResetPassword = () => {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();

  const schemaValidation = Yup.object({
    mobile: validations.mobile("Mobile").required("Mobile is required"),
  });

  return (
    <div className="flex flex-row backdrop">
      <div className="md:w-3/5 w-full mx-auto h-screen flex flex-col justify-center">
        <Formik
          initialValues={{ mobile: "" }}
          validationSchema={schemaValidation}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              const body = {
                mobile: values.mobile,
              };
              const response = await dispatch(resetPassword(body));
              console.log(response);
              if (response?.meta?.requestStatus === "fulfilled") {
                notify("Email sent successfully", { type: "success" });
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
                  Reset Password
                </p>
                <div className="form_input_wrapper">
                  <input
                    type="tel"
                    name="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    placeholder="Enter mobile number"
                    className={
                      errors.mobile && touched.mobile ? "input-error" : ""
                    }
                  />
                  {errors.mobile && touched.mobile && (
                    <span className="error">{errors.mobile}</span>
                  )}
                </div>

                <div className="login-btn">
                  <button
                    type="submit"
                    className="font-semibold capitalize bg-orange-600"
                  >
                    <TextSpinner loading={isSubmitting} text="Send Mail" />
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

export default ResetPassword;
