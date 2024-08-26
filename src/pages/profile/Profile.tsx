import * as Yup from "yup";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";

import { completeResetPassword } from "../../redux/actions/auth.action";
import { validations } from "../../utils/validations";

import { GenericObject } from "../../interfaces";
import {
  // BsPinMap as LocationIcon,
  BsMailbox2 as MailIcon,
  BsPhone as PhoneIcon,
} from "react-icons/bs";
import { Formik } from "formik";
import { getToken } from "../../utils/storage";
import { notify } from "../../utils/toastNotification";
import TextSpinner from "../../components/TextSpinner";
import { InputComponent } from "../../components/common/FormComponents";
import Button from "../../components/common/Button";

function Profile() {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile
  );

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

  // useEffect(() => {
  //   dispatch(getUser({}));
  // }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
          <div className="rounded-lg border py-4 px-5">
            <div className="flex flex-row justify-between items-start mb-4">
              <h3 className="font-bold text-2xl">Profile Information</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
              <FieldComponent
                icon={<MailIcon style={{ fontSize: "18px" }} />}
                label="First Name"
                value={authenticatedUser?.firstName ?? "--"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Middle Name"
                value={authenticatedUser?.middleName ?? "--"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Last Name"
                value={authenticatedUser?.lastName ?? "--"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
              <FieldComponent
                icon={<MailIcon style={{ fontSize: "18px" }} />}
                label="Email Address"
                value={authenticatedUser?.email ?? "--"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Phone Number"
                value={authenticatedUser?.mobile ?? "--"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Alt. Phone Number 1"
                value={authenticatedUser?.mobile1 ?? "--"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            initialValues={{ confirmPassword: "", password: "" }}
            validationSchema={schemaValidation}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setSubmitting(true);
                const body = {
                  token: getToken() as string,
                  newPassword: values.password,
                  confirmPassword: values.confirmPassword,
                };
                const response = await dispatch(completeResetPassword(body));
                console.log(response);
                if (response?.meta?.requestStatus === "fulfilled") {
                  notify("Password reset successfully", { type: "success" });
                  resetForm();
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
              <form
                className="rounded-lg border py-4 px-5"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <h3 className="font-bold text-xl sm:text-2xl mb-5 text-inherit">
                    Account Security
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values.password}
                    placeholder="Enter new password"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                  />

                  <InputComponent
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="Enter new password to confirm"
                    errors={errors}
                    touched={touched}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                  />
                </div>

                <div className="mt-0 mb-6 px-1 w-full">
                  <span
                    className="inline-block text-xs uppercase font-semibold cursor-pointer"
                    style={{ color: "lightslategray" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide Password" : "Show Password"}
                  </span>
                </div>

                <Button
                  type={"submit"}
                  text={<TextSpinner text="Reset Password" loading={isSubmitting} />}
                  style={styles.proceedBtn}
                />
              </form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}

const FieldComponent: React.FC<{
  width: string;
  label: string;
  value: string;
  sx?: GenericObject;
  icon?: any;
}> = ({ width, label, sx = {}, value = "", icon, ...rest }) => {
  return (
    <div className="flex flex-col items-start text-lg" style={{ width, ...sx }}>
      <div className="flex flex-row items-center gap-2 mb-1 w-full">
        {icon}
        <span
          style={{
            width: "auto",
            fontSize: "12px",
            fontWeight: 500,
            color: "#818793",
            // marginBottom: "3px",
            textTransform: "capitalize",
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          padding: "5px 0px",
        }}
        {...rest}
      >
        {value}
      </div>
    </div>
  );
};

const styles = {
  proceedBtn: {
    backgroundColor: "#21B591",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
};

export default Profile;
