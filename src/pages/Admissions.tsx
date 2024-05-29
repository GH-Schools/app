import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
// import { MdLock as PadlockIcon } from "react-icons/md";
import {
  AiOutlineUser as AccountIcon,
  AiOutlineCreditCard as PaymentIcon,
} from "react-icons/ai";

import { StoreState } from "../redux/reducers";

import Spinner from "../components/Spinner";
import { useQuery } from "../utils/useQuery";
import { validations } from "../utils/validations";

import { PAYSTACK_PUBLIC_KEY } from "../constants/keys";
// import { GenericObject } from "../interfaces";

import { login } from "../redux/actions/auth.action";
import {
  submitPayment,
  verifyPaymentByMobile,
} from "../redux/actions/payment.action";
import { getCurrentSession } from "../redux/actions/app.action";

import "./Admissions.scss";
import { notify } from "../utils/toastNotification";

enum SECTIONS {
  SECTION1,
  SECTION2,
}

type SectionProps = {
  setActiveSection?: React.Dispatch<React.SetStateAction<SECTIONS>> | Function;
  isActive: boolean;
};

type NavigationProps = {
  setActiveSection: React.Dispatch<React.SetStateAction<SECTIONS>>;
  activeSection: SECTIONS;
};

// NAVIGATION SECTION
const NavigationTab = ({
  activeSection,
  setActiveSection,
}: NavigationProps) => {
  return (
    <div className="flex flex-row md:flex-col backdrop p-6 gap-8 w-full md:w-auto h-auto md:h-full mb-3 md:mb-0 mr-0 md:mr-2 ">
      <button
        className={`flex flex-col rounded-xl hover:shadow-sm shadow-xl hover:scale-95 transition text-center items-center justify-center w-full md:max-w-52 px-5 py-5 ${
          activeSection === SECTIONS.SECTION2
            ? "bg-orange-600 ring ring-orange-600 text-white"
            : "bg-white"
        }`}
        onClick={() => setActiveSection(SECTIONS.SECTION2)}
        style={{ minHeight: "unset" }}
      >
        <span
          className={`mb-2.5 capitalize font-semibold text-sm ${
            activeSection === SECTIONS.SECTION2 ? "text-white" : "text-gray-500"
          }`}
        >
          <AccountIcon fontSize={48} />
        </span>

        <h2 className="font-bold text-sm md:text-base uppercase">
          Login to admissions dashboard
        </h2>
        <p
          className={`mt-2.5 capitalize font-semibold text-sm ${
            activeSection === SECTIONS.SECTION2 ? "text-white" : "text-gray-500"
          }`}
        >
          (For Returning students){" "}
        </p>
      </button>

      <button
        className={`flex flex-col rounded-xl hover:shadow-sm hover:scale-95 shadow-xl transition text-center items-center justify-center w-full md:max-w-52 px-5 py-5 ${
          activeSection === SECTIONS.SECTION1
            ? "bg-green-700 ring ring-green-700 text-white"
            : "bg-white"
        }`}
        onClick={() => setActiveSection(SECTIONS.SECTION1)}
        style={{ minHeight: "unset" }}
      >
        <span
          className={`mb-2.5 capitalize font-semibold text-sm ${
            activeSection === SECTIONS.SECTION1 ? "text-white" : "text-gray-500"
          }`}
        >
          <PaymentIcon fontSize={48} />
        </span>

        <h2 className="font-bold text-base md:text-base uppercase">
          Pay for admissions form
        </h2>

        <p
          className={`mt-2.5 capitalize font-semibold text-sm ${
            activeSection === SECTIONS.SECTION1 ? "text-white" : "text-gray-500"
          }`}
        >
          (New Application)
        </p>
      </button>
    </div>
  );
};

// PAYMENT SECTION
const Section1 = ({ isActive }: SectionProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const registrationCost = 150;

  const paystackHandler = usePaystackPayment({
    publicKey: PAYSTACK_PUBLIC_KEY,
  });

  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  console.log(academicSession);

  useEffect(() => {
    if (isActive) {
      dispatch(getCurrentSession());
    }
  }, [dispatch, isActive]);

  return (
    <>
      <section
        className={`${
          isActive ? "flex" : "hidden"
        } flex-col items-center w-full p-6 backdrop min-h-[500px] overflow-auto`}
      >
        <section
          className={`card flex flex-row flex-none rounded-2xl shadow-md text-center items-center justify-center bg-white w-full px-12 py-8 mb-5`}
          style={{ minHeight: "unset" }}
        >
          <div
            className={`flex flex-col text-left items-left justify-center w-full`}
          >
            <h2 className="font-bold text-xl md:text-2xl text-black">
              Select A Payment Method Below
            </h2>
            <p className="md:mt-3 mt-1 text-gray-500 font-medium text-base">
              {`Admission form into GH Schools costs GHC ${registrationCost}.00`}
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center sm:w-[100px] md:w-[150px] sm:h-[100px] md:h-[150px] text-[150px] bg-gray-100 border border-gray-300 fill-gray-400 p-8 rounded-xl my-auto ml-10">
            <PaymentIcon className="fill-gray-800" />
          </div>
        </section>

        <section className="card flex flex-col flex-none rounded-2xl shadow-md items-center justify-center bg-white w-full px-12 py-8 mb-5">
          <h2 className="font-bold text-xl w-full capitalize text-black">
            Pay for your fees online via - mobile or bank card option by filling
            the form below
          </h2>
          <p className="mt-4 text-base">
            Kindly provide your first and last name (surname) below. For
            example, if your first name is Abigail and last name (surname) is
            Osei, enter in the field below: Abigail Osei. Also note that, your
            payment receipt would be sent to the email address provided below.
          </p>

          <div className="w-full">
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "admissionsregistration@ghschools.online" ?? "",
                mobile: "",
              }}
              validationSchema={Yup.object({
                mobile: validations
                  .mobile("Phone number")
                  .required("Phone number is required"),
                first_name: validations
                  .name("First name")
                  .required("First name is required"),
                last_name: validations
                  .name("Last name")
                  .required("Last name is required"),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // alert("JDJJD");
                try {
                  setSubmitting(true);
                  const verification = await dispatch(
                    verifyPaymentByMobile({
                      mobile: values.mobile,
                    })
                  );

                  if (verification?.meta?.requestStatus === "fulfilled") {
                    notify("Payment record exists for this user", {
                      type: "warn",
                    });

                    return false;
                  }

                  // console.log(verification);

                  const paystackConfig = {
                    email: values?.email,
                    amount: registrationCost * 100,
                    currency: "GHS",
                    channels: [
                      "card",
                      "bank",
                      "mobile_money",
                      "bank_transfer",
                    ],
                    metadata: {
                      name: `${values?.first_name} ${values?.last_name}`,
                      phone: values?.mobile,
                      custom_fields: [],
                    },
                  };
                  paystackHandler({
                    config: paystackConfig,
                    onSuccess: (response) => {
                      console.log(response);
                      setSubmitting(true);
                      dispatch(
                        submitPayment({
                          firstName: values?.first_name,
                          lastName: values?.last_name,
                          mobile: values?.mobile,
                          email: values?.email,
                          reference: response?.reference ?? "",
                          amount: registrationCost,
                          currency: paystackConfig.currency,
                        })
                      )
                        .then((res: any) => {
                          console.log(res);
                          if (res?.meta?.requestStatus === "fulfilled") {
                            resetForm();
                            alert(
                              "Thanks for doing business with us! Come back soon!!"
                            );
                            navigate("/portal/admissions/payment-success");
                          }
                        })
                        .finally(() => {
                          setSubmitting(false);
                        });
                    },
                    onClose: () => {
                      alert("Wait! Don't leave :(");
                    },
                  });
                } catch (error) {
                  setSubmitting(false);
                  console.error(error);
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
                <form onSubmit={handleSubmit} className="flex flex-col mt-8">
                  <div className="flex flex-row gap-5">
                    <div className="form_input_wrapper">
                      <label htmlFor="first_name">
                        First Name <small className="text-red-600">*</small>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        placeholder="Enter first name"
                        className={
                          errors.first_name && touched.first_name
                            ? "input-error"
                            : ""
                        }
                        disabled={!isActive}
                      />
                      {errors.first_name && touched.first_name && (
                        <span className="error">{errors.first_name}</span>
                      )}
                    </div>

                    <div className="form_input_wrapper">
                      <label htmlFor="last_name">
                        Last Name <small className="text-red-600">*</small>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        placeholder="Enter last name"
                        className={
                          errors.last_name && touched.last_name
                            ? "input-error"
                            : ""
                        }
                        disabled={!isActive}
                      />
                      {errors.last_name && touched.last_name && (
                        <span className="error">{errors.last_name}</span>
                      )}
                    </div>
                  </div>

                  <div className="form_input_wrapper">
                    <label htmlFor="mobile">
                      Phone Number <small className="text-red-600">*</small>
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      placeholder="Enter last name"
                      className={
                        errors.mobile && touched.mobile ? "input-error" : ""
                      }
                      disabled={!isActive}
                    />
                    {errors.mobile && touched.mobile && (
                      <span className="error">{errors.mobile}</span>
                    )}
                  </div>

                  <div className="form_input_wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email address"
                      className={
                        errors.email && touched.email ? "input-error" : ""
                      }
                      disabled={!isActive}
                    />
                    {errors.email && touched.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>

                  <div className="login-btn">
                    <button
                      type="submit"
                      className="font-bold capitalize bg-orange-600 hover:shadow-sm shadow-lg hover:scale-95 transition"
                      disabled={
                        !isActive ||
                        !(
                          academicSession?.data?.sessionId ??
                          academicSession?.data?.SessionID
                        )
                      }
                    >
                      {isSubmitting ? (
                        <Spinner size={20} color="secondary" />
                      ) : (
                        "Proceed to payment"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </section>

        <section className="card flex flex-col flex-none rounded-2xl shadow-md items-start justify-center bg-white w-full px-12 py-8 mb-5">
          <p className="mb-4 text-base">Need more help?</p>
          <h2 className="font-bold capitalize text-xl text-black">
            Contact our admissions office (Mon-Fri | 8AM-5PM)
          </h2>
          <p className="mt-4 text-base">
            Our admissions office are available from Monday to Friday, between
            the hours of 8AM to 5PM. For enquiries or assistance, kindly contact
            on:
            <br />
            <br />
            Email Address:{" "}
            <a
              href="mailto:admissions@ghschools.online"
              className="border-b border-dotted text-gray-700"
            >
              admissions@ghschools.online
            </a>
            <br />
            Phone Number:{" "}
            <a
              href="tel:+233204622250"
              className="border-b border-dotted text-gray-700"
            >
              +233 204 622 250
            </a>
            <br />
            Alt. Phone Number:{" "}
            <a
              href="tel:+233544622250"
              className="border-b border-dotted text-gray-700"
            >
              +233 544 62 2250 (whatsapp only)
            </a>
          </p>
        </section>
      </section>
    </>
  );
};

// LOGIN SECTION
const Section2 = ({
  isActive,
  setActiveSection = () => null,
}: SectionProps) => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector(
    (state: StoreState) => state?.Auth?.login?.isLoading
  );

  const schemaValidation = Yup.object({
    mobile: validations.mobile("Mobile").required("Mobile is required"),
    password: validations
      .password("Password", 6, 24)
      .required("Password is required"),
  });

  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } flex-col items-center w-full p-6 backdrop min-h-[500px] overflow-auto`}
    >
      <section className="card flex flex-row flex-none rounded-2xl shadow-md text-center items-center justify-center bg-white w-full px-8 py-14 mb-5">
        {/* <img
          src={logo}
          alt="tradebuza"
          width={"200px"}
          className="hidden sm:block sm:[150px] md:w-[200px]"
          style={{
            margin: "1.8rem 0rem 0.2rem 5%",
            // width: "25%",
          }}
        /> */}

        <div
          className="hidden sm:flex items-center justify-center sm:[150px] md:w-[200px] text-[150px] bg-gray-100 border border-gray-300 fill-gray-400 p-8 rounded-xl"
          style={{
            margin: "1.8rem 5% 0.2rem 0",
            // width: "25%",
          }}
        >
          <AccountIcon className="fill-gray-800" />
        </div>

        <Formik
          initialValues={{ mobile: "", password: "" }}
          validationSchema={schemaValidation}
          onSubmit={async (values) => {
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
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex justify-between w-full max-w-lg"
            >
              <div
                id="login"
                className="form_wrapper shadow-none text-black"
                style={{
                  alignItems: "flex-start",
                  width: "100%",
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                <p className="w-full text-xl mb-3 font-semibold text-center md:text-left">
                  Sign In
                </p>
                <div className="flex flex-col form_input_wrapper items-start">
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
                    disabled={!isActive}
                  />
                  {errors.mobile && touched.mobile && (
                    <span className="error">{errors.mobile}</span>
                  )}
                </div>

                <div className="flex flex-col items-start form_input_wrapper password-input">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className={
                      errors.password && touched.password ? "input-error" : ""
                    }
                    disabled={!isActive}
                  />
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <div className="login-btn">
                  <button
                    type="submit"
                    className="font-bold text-sm uppercase bg-orange-600 hover:shadow-sm shadow-lg hover:scale-95 transition"
                    disabled={!isActive}
                  >
                    {isLoading ? (
                      <Spinner size={20} color="secondary" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                <div className="mt-4 w-full text-center md:text-left">
                  <a href="/portal/password/reset" className="text-md">
                    Forgot password?
                  </a>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </section>

      <section className="card flex flex-col flex-none rounded-2xl shadow-md items-center justify-center bg-green-800 text-slate-50 w-full p-8 mb-5">
        {/* <p className="mb-4">NEED MORE HELP?</p> */}
        <h2 className="font-bold text-xl capitalize">
          Don't have an account yet?
        </h2>
        <p className="my-4 text-center max-w-2xl text-base">
          Our admissions office are available from monday to friday, between the
          hours of 8AM to 5PM. For enquiries or assistance, kindly contact us
          on:
          <br />
          Email:{" "}
          <a
            href="mailto:admissions@ghschools.online"
            className="border-b border-dotted"
          >
            admissions@ghschools.online
          </a>
        </p>

        <button
          type="button"
          className="font-bold text-sm uppercase bg-orange-600 rounded-md px-5 py-3 mt-1"
          disabled={!isActive}
          onClick={() => setActiveSection(SECTIONS.SECTION1)}
        >
          {"Apply for admission"}
        </button>
      </section>

      <section className="card flex flex-col flex-none rounded-2xl shadow-md items-start justify-center bg-white w-full px-12 py-8 mb-5">
        <p className="mb-4 text-base">Need more help?</p>
        <h2 className="font-bold capitalize text-2xl text-black">
          Contact our admissions office (Mon-Fri | 8AM-5PM)
        </h2>
        <p className="mt-4 text-base">
          Our admissions office are available from Monday to Friday, between the
          hours of 8AM to 5PM. For enquiries or assistance, kindly contact on:
          <br />
          <br />
          Email Address:{" "}
          <a
            href="mailto:admissions@ghschools.online"
            className="border-b border-dotted text-gray-700"
          >
            admissions@ghschools.online
          </a>
          <br />
          Phone Number:{" "}
          <a
            href="tel:+233204622250"
            className="border-b border-dotted text-gray-700"
          >
            +233 204 622 250
          </a>
          <br />
          Alt. Phone Number:{" "}
          <a
            href="tel:+233544622250"
            className="border-b border-dotted text-gray-700"
          >
            +233 544 62 2250 (whatsapp only)
          </a>
        </p>
      </section>
    </section>
  );
};

function Admissions() {
  const urlParam = useQuery();

  const queryMap: { [x: string]: SECTIONS } = {
    apply: SECTIONS.SECTION1,
    account: SECTIONS.SECTION2,
  };

  const [activeSection, setActiveSection] = useState(
    queryMap[urlParam.get("tab") || "account"]
  );

  return (
    <main className="flex w-full justify-center min-h-[500px] bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-[500px] max-w-[1440px] bg-white">
        <NavigationTab
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="flex flex-row ">
          <Section1 isActive={activeSection === SECTIONS.SECTION1} />
          <Section2
            isActive={activeSection === SECTIONS.SECTION2}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </main>
  );
}

export default Admissions;
