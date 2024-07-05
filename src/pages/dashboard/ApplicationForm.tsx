import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import InputComponent from "../../components/common/InputComponent";

function Application() {
  const navigate = useNavigate();
  enum Steps {
    PERSONAL,
    EDUCATION,
  }

  const [activeForm, setActiveForm] = useState(Steps.PERSONAL);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5" style={{ color: "#111" }}>
      <section className="flex flex-row gap-5" id="personal">
        <div className="flex flex-col flex-grow shadow-md rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            initialValues={{
              firstName: "",
              middleName: "",
              lastName: "",
              email: "",
              residentialAddress: "",
              regionOfResidence: "",
              sex: "",
              dob: "",
              nationality: "",
              nationalIDType: "",
              nationalIDNumber: "",
              currentJob: "",
              language: "",
            }}
            onSubmit={(values, helpers) => {}}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              resetForm,
              errors,
              touched,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <h3 className="font-bold text-xl mb-4 text-inherit">
                  Personal Profile
                </h3>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="First Name"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />

                  <InputComponent
                    label="Middle Name"
                    name="middleName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.middleName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />

                  <InputComponent
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.lastName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.email}
                    placeholder="E.g. temiloluwa@gmail.com"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Residential Address"
                    name="residentialAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.residentialAddress}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />

                  <InputComponent
                    label="Nationality"
                    name="nationality"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nationality}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Area of Residence"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />

                  <InputComponent
                    label="Region of Residence"
                    name="regionOfResidence"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.regionOfResidence}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Sex"
                    name="sex"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sex}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.PERSONAL}
                  />

                  <InputComponent
                    label="Date of Birth"
                    name="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.dob}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    type="date"
                    disabled={activeForm !== Steps.PERSONAL}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 mt-4 items-center justify-end w-full">
                  {activeForm === Steps.PERSONAL && (
                    <>
                      <Button
                        text="Reset Form"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid lightgray",
                          textTransform: "capitalize",
                          color: "#555",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                        onClick={() => resetForm()}
                      />

                      <Button
                        text="Save &amp; Continue"
                        style={{
                          backgroundColor: "dodgerblue",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          navigate("/dashboard/apply/form#education");
                          setActiveForm(Steps.EDUCATION);
                        }}
                      />
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>

      <section className="flex flex-row gap-5" id="education">
        <div className="flex flex-col flex-grow shadow-md rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            initialValues={{
              nameOfSchoolAttended1: "",
              // yearAttended1,
              // locationOfSchoolAttended1,
              // qualification1,
              reference: "",
              passportPhoto: "",
              mobile1: "",
              mobile2: "",
              // nameOfSchoolAttended2,
              // locationOfSchoolAttended2,
              // yearAttended2,
              // qualification2,
              // nameOfSchoolAttended3,
              // locationOfSchoolAttended3,
              // yearAttended3,
              // qualification3,
              // preferredCourse,
              // courseSession,
              // preferHostel,
              // hasMedicalCondition,
              // medicalCondition,
              // hasDisability,
              // disability,
              // source,
              // priorExperience,
              // priorExperienceSpecialization,
              // sponsorName,
              // sponsorRelationship,
              // sponsorOccupation,
              // sponsorAddress,
              // sponsorMobile,
            }}
            onSubmit={(values, helpers) => {}}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              resetForm,
              errors,
              touched,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <h3 className="font-bold text-xl mb-4 text-inherit">
                  Educational Information
                </h3>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="First Name"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />

                  <InputComponent
                    label="Middle Name"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />

                  <InputComponent
                    label="Last Name"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Email Address"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Address"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />

                  <InputComponent
                    label="Nationality"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Area of Residence"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />

                  <InputComponent
                    label="Region of Residence"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Sex"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={activeForm !== Steps.EDUCATION}
                  />

                  <InputComponent
                    label="Date of Birth"
                    name="nameOfSchoolAttended1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nameOfSchoolAttended1}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    type="date"
                    disabled={activeForm !== Steps.EDUCATION}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 mt-4 items-center justify-end w-full">
                  {activeForm === Steps.EDUCATION && (
                    <>
                      <Button
                        text="Go Back"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid lightgray",
                          textTransform: "capitalize",
                          color: "#555",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                        onClick={() => {
                          navigate("/dashboard/apply/form#personal");
                          setActiveForm(Steps.PERSONAL);
                        }}
                      />

                      <Button
                        text="Save &amp; Continue"
                        style={{
                          backgroundColor: "dodgerblue",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      />
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}

export default Application;
