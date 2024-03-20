import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import "./Admissions.scss";

function Admissions() {
  return (
    <main className="flex flex-col items-center justify-center w-full p-6 backdrop min-h-[500px]">
      <section className="card flex flex-col rounded-2xl shadow-lg text-center items-center justify-center bg-white w-full p-8 mb-5">
        <h2 className="font-bold text-xl">SELECT A PAYMENT METHOD BELOW</h2>
        <p className="mt-4">ADMISSION FORM INTO GH SCHOOLS COSTS GHC 150.00</p>
      </section>

      <section className="card flex flex-col rounded-2xl shadow-lg items-center justify-center bg-white w-full p-8 mb-5">
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

      <section className="card flex flex-col rounded-2xl shadow-lg items-start justify-center bg-white w-full p-8 mb-5">
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
    </main>
  );
}

export default Admissions;
