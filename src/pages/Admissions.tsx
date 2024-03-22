import { Formik } from "formik";
import React, { SetStateAction, useState } from "react";
import * as Yup from "yup";

import { login } from "../redux/actions/auth.action";

import { validations } from "../utils/validations";
import logo from "../assets/favicon.png";

import Spinner from "../components/Spinner";
import "./Admissions.scss";
import { useDispatch } from "react-redux";
import { PiDnaDuotone } from "react-icons/pi";

enum SECTIONS {
  SECTION1,
  SECTION2,
}

type SectionProps = {
  isActive: boolean;
};

type NavigationProps = {
  setActiveSection: React.Dispatch<React.SetStateAction<SECTIONS>>;
  activeSection: SECTIONS;
};

const Section1 = ({ isActive }: SectionProps) => {
  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } flex-col items-center w-full p-6 backdrop min-h-[500px] overflow-auto`}
    >
      <section
        className={`card flex flex-col flex-none rounded-2xl shadow-lg text-center items-center justify-center bg-white w-full p-8 mb-5`}
      >
        <h2 className="font-bold text-xl">SELECT A PAYMENT METHOD BELOW</h2>
        <p className="mt-4">ADMISSION FORM INTO GH SCHOOLS COSTS GHC 150.00</p>
      </section>

      <section className="card flex flex-col flex-none rounded-2xl shadow-lg items-center justify-center bg-white w-full p-8 mb-5">
        <h2 className="font-bold text-xl">
          PAY FOR YOUR FEES ONLINE VIA - MOBILE MOBILE OR BANK CARD OPTION BY
          FILLING THE FORM BELOW
        </h2>
        <p className="mt-4">
          KINDLY PROVIDE YOUR FIRST AND LAST NAME (SURNAME) BELOW. FOR EXAMPLE,
          IF YOUR FIRST NAME IS ABIGAIL AND LAST NAME (SURNAME) IS OSEI, ENTER
          IN THE FIELD BELOW: ABIGAIL OSEI. ALSO NOTE THAT, YOUR PAYMENT RECEIPT
          WOULD BE SENT TO THE EMAIL ADDRESS PROVIDED BELOW.
        </p>

        <div>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
            }}
            validationSchema={Yup.object({})}
            onSubmit={(values) => {
              alert("JDJJD");
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
              <form onSubmit={handleSubmit} className="flex flex-col mt-8">
                <div className="flex flex-row gap-5">
                  <div className="form_input_wrapper">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                      placeholder="Enter first anme"
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
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      placeholder="Enter last anme"
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
                  <label htmlFor="last_name">Email</label>
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    placeholder="Enter last anme"
                    className={
                      errors.last_name && touched.last_name ? "input-error" : ""
                    }
                    disabled={!isActive}
                  />
                  {errors.last_name && touched.last_name && (
                    <span className="error">{errors.last_name}</span>
                  )}
                </div>

                <div className="form_input_wrapper">
                  <label htmlFor="last_name">Phone Number</label>
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    placeholder="Enter last anme"
                    className={
                      errors.last_name && touched.last_name ? "input-error" : ""
                    }
                    disabled={!isActive}
                  />
                  {errors.last_name && touched.last_name && (
                    <span className="error">{errors.last_name}</span>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>

      <section className="card flex flex-col flex-none rounded-2xl shadow-lg items-start justify-center bg-white w-full p-8 mb-5">
        <p className="mb-4">NEED MORE HELP?</p>
        <h2 className="font-bold text-xl">
          CONTACT OUR ADMISSIONS OFFICE (MON-FRI | 8AM-5PM)
        </h2>
        <p className="mt-4">
          OUR ADMISSIONS OFFICE ARE AVAILABLE FROM MONDAY TO FRIDAY, BETWEEN THE
          HOURS OF 8AM TO 5PM. FOR ENQUIRIES OR ASSISTANCE, KINDLY CONTACT ON:
          <br />
          EMAIL:{" "}
          <a href="mailto:admissions@ghschools.online">
            ADMISSIONS@GHSCHOOLS.ONLINE
          </a>
          <br />
          <br />
          <a href="tel:+233204622250">+233 204 622 250</a>
          <br />
          <a href="tel:+233544622250">+233 544 62 2250 (WHATSAPP ONLY)</a>
        </p>
      </section>
    </section>
  );
};

const Section2 = ({ isActive }: SectionProps) => {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();

  const schemaValidation = Yup.object({
    email: validations.email("Email").required("Email is required"),
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
      <section className="card flex flex-row flex-none rounded-2xl shadow-lg text-center items-center justify-center bg-white w-full p-6 mb-5">
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
          className="hidden sm:block sm:[150px] md:w-[200px] text-[150px]"
          style={{
            margin: "1.8rem 3% 0.2rem 0",
            // width: "25%",
          }}
        >
          <PiDnaDuotone />
        </div>

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
            <form
              onSubmit={handleSubmit}
              className="flex justify-between w-full max-w-xl"
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
                <p className="w-full text-xl font-bold text-center md:text-left">
                  Sign In
                </p>
                <div className="flex flex-col form_input_wrapper items-start">
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
                    disabled={!isActive}
                  />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
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
                    className="font-bold uppercase bg-orange-600"
                    disabled={!isActive}
                  >
                    {isSubmitting ? (
                      <Spinner size={20} color="secondary" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                <div className="mt-4 w-full text-center md:text-left">
                  <a href="#e">Forgot Password?</a>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </section>

      <section className="card flex flex-col flex-none rounded-2xl shadow-lg items-start justify-center bg-white w-full p-8 mb-5">
        <p className="mb-4">NEED MORE HELP?</p>
        <h2 className="font-bold text-xl">
          CONTACT OUR ADMISSIONS OFFICE (MON-FRI | 8AM-5PM)
        </h2>
        <p className="mt-4">
          OUR ADMISSIONS OFFICE ARE AVAILABLE FROM MONDAY TO FRIDAY, BETWEEN THE
          HOURS OF 8AM TO 5PM. FOR ENQUIRIES OR ASSISTANCE, KINDLY CONTACT ON:
          <br />
          EMAIL:{" "}
          <a href="mailto:admissions@ghschools.online">
            ADMISSIONS@GHSCHOOLS.ONLINE
          </a>
          <br />
          <br />
          <a href="tel:+233204622250">+233 204 622 250</a>
          <br />
          <a href="tel:+233544622250">+233 544 62 2250 (WHATSAPP ONLY)</a>
        </p>
      </section>
    </section>
  );
};

const NavigationTab = ({
  activeSection,
  setActiveSection,
}: NavigationProps) => {
  return (
    <div className="flex flex-row md:flex-col backdrop p-6 gap-8 w-full md:w-auto h-auto md:h-full mb-5 md:mb-0 mr-0 md:mr-5 border">
      <button
        className={`flex flex-col rounded-xl shadow-lg text-center items-center justify-center w-full p-4 ${
          activeSection === SECTIONS.SECTION2
            ? "bg-orange-600 ring ring-orange-600 text-white"
            : "bg-white"
        }`}
        onClick={() => setActiveSection(SECTIONS.SECTION2)}
        style={{ minHeight: "unset" }}
      >
        <h2 className="font-bold text-base md:text-lg">LOGIN TO DASHBOARD</h2>
        <p className="mt-2 capitalize">(For Returning students) </p>
      </button>

      <button
        className={`flex flex-col rounded-xl shadow-lg text-center items-center justify-center w-full p-4 ${
          activeSection === SECTIONS.SECTION1
            ? "bg-green-700 ring ring-green-700 text-white"
            : "bg-white"
        }`}
        onClick={() => setActiveSection(SECTIONS.SECTION1)}
        style={{ minHeight: "unset" }}
      >
        <h2 className="font-bold text-base md:text-lg">APPLY FOR ADMISSION</h2>
        <p className="mt-2 capitalize">(For Applicants)</p>
      </button>
    </div>
  );
};

function Admissions() {
  const [activeSection, setActiveSection] = useState(SECTIONS.SECTION1);
  return (
    <main className="flex w-full justify-center min-h-[500px] bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-[500px] max-w-[1440px] bg-white">
        <NavigationTab
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="flex flex-row ">
          <Section1 isActive={activeSection === SECTIONS.SECTION1} />
          <Section2 isActive={activeSection === SECTIONS.SECTION2} />
        </div>
      </div>
    </main>
  );
}

export default Admissions;
