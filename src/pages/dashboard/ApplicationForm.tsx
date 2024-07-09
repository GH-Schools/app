import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import {
  InputComponent,
  SelectComponent,
} from "../../components/common/FormComponents";
import { validations } from "../../utils/validations";
import Notice from "../../components/common/Notice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { getMyPayments } from "../../redux/actions/payment.action";
import { getAuthUser } from "../../utils/storage";

function Application() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile ?? getAuthUser()
  );

  enum Steps {
    PERSONAL,
    EDUCATION,
    HOSPITALITY,
  }
  
  const [activeForm, setActiveForm] = useState(Steps.PERSONAL);
  const [combinedFormValues, setCombinedFormValues] = useState({});
  const paymentInfo = useSelector((state: StoreState) => state?.Payment?.payments[0]);
  
  const disabledForms = {
    [Steps.PERSONAL]: activeForm !== Steps.PERSONAL || !paymentInfo,
    [Steps.EDUCATION]: activeForm !== Steps.EDUCATION || !paymentInfo,
    [Steps.HOSPITALITY]: activeForm !== Steps.HOSPITALITY || !paymentInfo,
  }

  useEffect(() => {
    dispatch(getMyPayments({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5" style={{ color: "#111" }}>
      <div className="flex flex-col">
        <Notice
          variant="warn"
          title="Note:"
          message={
            "This admissions form has been disabled because admissions for this session has ended!"
          }
        ></Notice>
      </div>

      <section className="flex flex-row gap-5" id="personal">
        <div className="flex flex-col flex-grow shadow-md rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: authenticatedUser?.firstName ?? "",
              middleName: authenticatedUser?.middleName ?? "",
              lastName: authenticatedUser?.lastName ?? "",
              email: authenticatedUser?.email ?? "",
              mobile1: authenticatedUser?.mobile ?? "",
              sex: "",
              dob: "",
              residentialAddress: "",
              regionOfResidence: "",
              nationality: "",
              nationalIDType: "",
              nationalIDNumber: "",
              currentJob: "",
              language: "",
            }}
            validationSchema={Yup.object({
              firstName: validations
                .name("First Name")
                .required("First name is required"),
              lastName: validations
                .name("Last Name")
                .required("Last name is required"),
              mobile1: validations
                .mobile("Mobile Number")
                .required("Mobile Number is required"),
              sex: validations.blank().required("Sex is required"),
              dob: validations.blank().required("Date of birth is required"),
              nationalIDType: validations
                .blank()
                .required("National ID type is required"),
              nationalIDNumber: validations
                .blank()
                .required("National ID number is required"),
            })}
            onSubmit={(values, helpers) => {
              console.log(values);
              navigate("/dashboard/apply/form#education");
              setCombinedFormValues((prev) => ({ ...prev, ...values }));
              setActiveForm(Steps.EDUCATION);
            }}
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

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
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
                    required={true}
                    disabled={disabledForms[Steps.PERSONAL]}
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
                    disabled={disabledForms[Steps.PERSONAL]}
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
                    required={true}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
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
                    type="email"
                    disabled={disabledForms[Steps.PERSONAL]}
                  />

                  <InputComponent
                    label="Mobile Number"
                    name="mobile1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.mobile1}
                    placeholder="E.g. 0905962333555"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    type="tel"
                    required={true}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
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
                    required={true}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />

                  <SelectComponent
                    label="Sex"
                    name="sex"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sex}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    options={[
                      { name: "- Choose a gender -", value: "" },
                      { name: "Male", value: "male" },
                      { name: "Female", value: "female" },
                    ]}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />

                  <InputComponent
                    label="Language"
                    name="language"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.language}
                    placeholder="E.g. English"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
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
                    disabled={disabledForms[Steps.PERSONAL]}
                  />

                  <SelectComponent
                    label="Nationality"
                    name="nationality"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nationality}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    options={[
                      { name: "- Choose a country -", value: "" },
                      { name: "Nigeria", value: "nigerian" },
                      { name: "Ghana", value: "ghanian" },
                    ]}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
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
                    disabled={disabledForms[Steps.PERSONAL]}
                  />

                  <SelectComponent
                    label="Region of Residence"
                    name="regionOfResidence"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.regionOfResidence}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    options={[
                      { name: "- Choose a region -", value: "" },
                      { name: "Accra", value: "accra" },
                      { name: "Ghana", value: "ghanian" },
                    ]}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="National ID Type"
                    name="nationalIDType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nationalIDType}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    options={[
                      { name: "- Choose an ID type -", value: "" },
                      { name: "Driver's Licence", value: "driver's license" },
                      {
                        name: "International Passport",
                        value: "international passport",
                      },
                    ]}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />

                  <InputComponent
                    label="ID Number"
                    name="nationalIDNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.nationalIDNumber}
                    placeholder="E.g. 12334322121"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Occupation"
                    name="currentJob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.currentJob}
                    placeholder="E.g. Plumber"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.PERSONAL]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 mt-4 items-center justify-end w-full">
                  {!disabledForms[Steps.PERSONAL] && (
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
                        type="submit"
                        text="Save &amp; Continue"
                        style={styles.proceedBtn}
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
              // Max of 3
              previousSchoolInfo: [
                {
                  name: "",
                  yearAttended: "",
                  locationOfSchool: "",
                  qualification: "",
                },
              ],
              preferredCourse: "",
              courseSession: "",
              priorExperience: "",
              priorExperienceSpecialization: "",
              source: "",
              reference: paymentInfo?.reference,
              // passportPhoto: "",
              // mobile2: "",
            }}
            validationSchema={Yup.object({
              preferredCourse: validations
                .blank()
                .required("Preferred course is required"),
              source: validations
                .blank()
                .required("Referral source is required"),
            })}
            onSubmit={(values, helpers) => {
              console.log(values);
              setCombinedFormValues((prev) => ({ ...prev, ...values }));
              navigate("/dashboard/apply/form#hospitality");
              setActiveForm(Steps.HOSPITALITY);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              resetForm,
              setValues,
              errors,
              touched,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <h3 className="font-bold text-xl mb-4 text-inherit">
                  Educational Information
                </h3>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b mt-3 mb-4">
                  <h3 className="font-bold text-sm pb-2 text-inherit">
                    Previous Education
                  </h3>
                </div>

                {values?.previousSchoolInfo.map((schoolInfo, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full"
                  >
                    <InputComponent
                      label={`School Name ${index + 1}`}
                      name={`previousSchoolInfo[${index}].name`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={schoolInfo?.name}
                      placeholder="E.g. Temiloluwa"
                      sx={{ marginBottom: "10px" }}
                      width="100%"
                      required={index === 0}
                      disabled={disabledForms[Steps.EDUCATION]}
                    />

                    <InputComponent
                      label={`School ${index + 1} Year of Study`}
                      name={`previousSchoolInfo[${index}].yearAttended`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={schoolInfo?.yearAttended}
                      placeholder="E.g. Temiloluwa"
                      sx={{ marginBottom: "10px" }}
                      width="100%"
                      required={index === 0}
                      disabled={disabledForms[Steps.EDUCATION]}
                    />

                    <InputComponent
                      label={`School ${index + 1} Location`}
                      name={`previousSchoolInfo[${index}].locationOfSchool`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={schoolInfo?.locationOfSchool}
                      placeholder="E.g. Accra"
                      sx={{ marginBottom: "10px" }}
                      width="100%"
                      required={index === 0}
                      disabled={disabledForms[Steps.EDUCATION]}
                    />

                    <SelectComponent
                      label={`Qualification ${index + 1}`}
                      name={`previousSchoolInfo[${index}].qualification`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={schoolInfo?.qualification}
                      sx={{ marginBottom: "10px" }}
                      width="100%"
                      options={[
                        { name: "- Choose a qualification -", value: "" },
                        { name: "Bachelor of Science (B.Sc.)", value: "B.Sc." },
                        { name: "Masters of Science (M.Sc.)", value: "M.Sc." },
                      ]}
                      required={index === 0}
                      disabled={disabledForms[Steps.EDUCATION]}
                    />

                    {index > 0 && (
                      <Button
                        text="-"
                        style={{
                          color: "red",
                          fontWeight: 600,
                          padding: "10px",
                          fontSize: "12px",
                          // marginTop: "10px",
                          cursor: "pointer",
                          alignSelf: "flex-end",
                          marginBottom: "14px",
                          border: "1px solid red",
                          textTransform: "capitalize",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          setValues((prevValues) => ({
                            ...prevValues,
                            previousSchoolInfo:
                              prevValues.previousSchoolInfo.filter(
                                (_, schoolIndex) => schoolIndex !== index
                              ),
                          }));
                        }}
                      />
                    )}
                  </div>
                ))}

                {values.previousSchoolInfo.length < 3 && (
                  <Button
                    text="Add Education"
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      padding: "10px",
                      backgroundColor: "transparent",
                      border: "1px solid dodgerblue",
                      textTransform: "capitalize",
                      color: "dodgerblue",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        previousSchoolInfo:
                          prevValues.previousSchoolInfo.concat([
                            {
                              name: "",
                              yearAttended: "",
                              locationOfSchool: "",
                              qualification: "",
                            },
                          ]),
                      }));
                    }}
                  />
                )}

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b mt-3 mb-4">
                  <h3 className="font-bold text-sm pb-2 text-inherit">
                    Other Information
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Preferred Course"
                    name="preferredCourse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.preferredCourse}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    disabled={disabledForms[Steps.EDUCATION]}
                    options={[
                      { name: "- Choose a course -", value: "" },
                      { name: "GH Media", value: "media" },
                      {
                        name: "GH Fashion",
                        value: "fashion",
                      },
                      {
                        name: "GH Cosmetology",
                        value: "cosmetology",
                      },
                    ]}
                  />

                  <SelectComponent
                    label="Preferred Course Session"
                    name="courseSession"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.courseSession}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.EDUCATION]}
                    options={[
                      { name: "- Choose a seesion -", value: "" },
                      { name: "GH Media", value: "media" },
                      {
                        name: "GH Fashion",
                        value: "fashion",
                      },
                      {
                        name: "GH Cosmetology",
                        value: "cosmetology",
                      },
                    ]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Previous Experience"
                    name="priorExperience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.priorExperience}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.EDUCATION]}
                  />

                  <InputComponent
                    label="Specialization in Previous Experience:"
                    name="priorExperienceSpecialization"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.priorExperienceSpecialization}
                    placeholder="E.g. Farming"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.EDUCATION]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Where did you hear about us?"
                    name="source"
                    required={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.source}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.EDUCATION]}
                    options={[
                      { name: "- Choose an option -", value: "" },
                      { name: "Google", value: "media" },
                      {
                        name: "Television",
                        value: "fashion",
                      },
                      {
                        name: "Referral from someone",
                        value: "cosmetology",
                      },
                    ]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 mt-4 items-center justify-end w-full">
                  {!disabledForms[Steps.EDUCATION] && (
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
                        type="submit"
                        text="Save &amp; Continue"
                        style={styles.proceedBtn}
                      />
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>

      <section className="flex flex-row gap-5" id="hospitality">
        <div className="flex flex-col flex-grow shadow-md rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            initialValues={{
              preferHostel: "false",
              hasMedicalCondition: "false",
              medicalCondition: "",
              hasDisability: "false",
              disability: "",
              sponsorName: "",
              sponsorRelationship: "",
              sponsorOccupation: "",
              sponsorAddress: "",
              sponsorMobile: "",
            }}
            onSubmit={(values, helpers) => {
              console.log(values);
              setCombinedFormValues((prev) => ({ ...prev, ...values }));
              alert("Thanks a lot");
              console.log(combinedFormValues);
              // navigate("/dashboard/apply/form#education");
              // setActiveForm(Steps.EDUCATION);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              resetForm,
              setValues,
              errors,
              touched,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <h3 className="font-bold text-xl mb-4 text-inherit">
                  Welfare &amp; Sponsorship Information
                </h3>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b mt-3 mb-4">
                  <h3 className="font-bold text-sm pb-2 text-inherit">
                    Hospitality &amp; Welfare
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Do you need hostel accomodation?"
                    name="preferHostel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.preferHostel}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                    options={[
                      { name: "- Choose an option -", value: "false" },
                      { name: "Yes", value: "true" },
                      {
                        name: "No",
                        value: "false",
                      },
                    ]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Do you have any medical condition?"
                    name="hasMedicalCondition"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.hasMedicalCondition}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    disabled={disabledForms[Steps.HOSPITALITY]}
                    options={[
                      { name: "- Choose an option -", value: "false" },
                      { name: "Yes", value: "true" },
                      {
                        name: "No",
                        value: "false",
                      },
                    ]}
                  />

                  <InputComponent
                    label="If yes, specify the medical condition here:"
                    name="medicalCondition"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.medicalCondition}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Do you have any disability?"
                    name="hasDisability"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.hasDisability}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    disabled={disabledForms[Steps.HOSPITALITY]}
                    options={[
                      { name: "- Choose an option -", value: "false" },
                      { name: "Yes", value: "true" },
                      {
                        name: "No",
                        value: "false",
                      },
                    ]}
                  />

                  <InputComponent
                    label="If yes, specify the disability here:"
                    name="disability"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.disability}
                    placeholder="E.g. blind"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b mt-3 mb-4">
                  <h3 className="font-bold text-sm pb-2 text-inherit">
                    Sponsorship &amp; Information
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Sponsor's Name"
                    name="sponsorName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sponsorName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />

                  <SelectComponent
                    label="Relationship With Sponsor"
                    name="sponsorRelationship"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sponsorRelationship}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                    options={[
                      { name: "- Choose relationship -", value: "" },
                      { name: "Father", value: "father" },
                      { name: "Mother", value: "mother" },
                    ]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Sponsor's Occupation"
                    name="sponsorOccupation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sponsorOccupation}
                    placeholder="E.g. Engineer"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />

                  <InputComponent
                    label="Sponsor's Mobile"
                    name="sponsorMobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sponsorMobile}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    type="tel"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Sponsor's Address"
                    name="sponsorAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sponsorAddress}
                    placeholder="E.g. No 14, Kings Street"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 mt-4 items-center justify-end w-full">
                  {!disabledForms[Steps.HOSPITALITY] && (
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
                          navigate("/dashboard/apply/form#education");
                          setActiveForm(Steps.EDUCATION);
                        }}
                      />

                      <Button
                        type="submit"
                        text="Submit Application"
                        style={styles.proceedBtn}
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

const styles = {
  proceedBtn: {
    backgroundColor: "#21B591",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
};

export default Application;
