import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import {
  InputComponent,
  SelectComponent,
  FileUploadComponent,
} from "../../components/common/FormComponents";
import Button from "../../components/common/Button";
import Lottie from "../../components/common/Lottie";
import TextSpinner from "../../components/TextSpinner";
import Notice, { theme as NoticeTheme } from "../../components/common/Notice";

import { StoreState } from "../../redux/reducers";
import { getAuthUser } from "../../utils/storage";
import { validations } from "../../utils/validations";
import {
  getMyAdmissionForm,
  saveAdmissionEducation,
  saveAdmissionPersonalProfile,
  saveAdmissionWelfareInformation,
} from "../../redux/actions/dashboard.action";
import { getMyPayments } from "../../redux/actions/payment.action";

import checkCircledLottie from "../../assets/lotties/check_circled.lottie.json";
import { schoolCourses } from "../../constants/data";
import { OptionProps } from "../../interfaces";

import { notify } from "../../utils/toastNotification";
import { mergeClassNames } from "../../utils/utilities";

function Application() {
  const [completed, setCompleted] = useState(false);

  const admissionInfo = useSelector(
    (state: StoreState) => state?.Dashboard?.data?.[0]
  );

  return (
    <div className="flex flex-col gap-7 my-5 mx-5" style={{ color: "#111" }}>
      <div className="flex flex-col">
        {admissionInfo?.hasCompletedForm && (
          <Notice
            variant="success"
            title="Next Steps:"
            message={
              "Success! You can now download a copy of your admission form for your reference"
            }
          >
            <Button
              text={"Download PDF"}
              // href={"/dashboard/apply/form"}
              className="text-center font-bold"
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: NoticeTheme.success.title.color,
                textTransform: "capitalize",
              }}
            />
          </Notice>
        )}

        <Notice
          variant="warn"
          title="Note:"
          message={
            "Please note that this admissions form will be disabled after admissions for this session has ended!"
          }
        ></Notice>
      </div>

      {!completed ? <Form setCompleted={setCompleted} /> : <Success />}
    </div>
  );
}

const Form = ({
  setCompleted,
}: {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  enum Steps {
    PERSONAL,
    EDUCATION,
    HOSPITALITY,
  }

  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile ?? getAuthUser()
  );

  const paymentInfo = useSelector(
    (state: StoreState) => state?.Payment?.payments?.[0]
  );

  const admissionInfo = useSelector(
    (state: StoreState) => state?.Dashboard?.data?.[0]
  );

  const admissionInfoIsLoading = useSelector(
    (state: StoreState) => state?.Dashboard?.isLoading
  );

  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const [activeForm, setActiveForm] = useState<Steps | null>(
    admissionInfo?.hasCompletedForm ? null : Steps.PERSONAL
  );
  const [combinedFormValues, setCombinedFormValues] = useState({});

  const disabledForms = {
    [Steps.PERSONAL]:
      activeForm !== Steps.PERSONAL || !paymentInfo || admissionInfoIsLoading,
    [Steps.EDUCATION]:
      activeForm !== Steps.EDUCATION || !paymentInfo || admissionInfoIsLoading,
    [Steps.HOSPITALITY]:
      activeForm !== Steps.HOSPITALITY ||
      !paymentInfo ||
      admissionInfoIsLoading,
  };

  const editForm = (step: Steps) => (ev: any) => {
    ev.preventDefault();
    setActiveForm(step);
  };

  useEffect(() => {
    dispatch(getMyPayments({}));
    if (authenticatedUser?.userId) {
      dispatch(getMyAdmissionForm(authenticatedUser?.userId as string));
    }
  }, [authenticatedUser?.userId, dispatch]);

  useEffect(() => {
    if (
      academicSession?.data?.sessionId &&
      admissionInfo?.hasCompletedForm === true
    ) {
      setActiveForm(null);
    }
  }, [academicSession?.data?.sessionId, admissionInfo?.hasCompletedForm]);

  return (
    <>
      <section className="flex flex-row gap-5" id="personal">
        <div className="flex flex-col flex-grow shadow-md rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName:
                admissionInfo?.firstName ?? authenticatedUser?.firstName ?? "",
              middleName:
                admissionInfo?.middleName ??
                authenticatedUser?.middleName ??
                "",
              lastName:
                admissionInfo?.lastName ?? authenticatedUser?.lastName ?? "",
              mobile1:
                admissionInfo?.mobile1 ?? authenticatedUser?.mobile ?? "",
              email: admissionInfo?.email ?? authenticatedUser?.email ?? "",
              residentialArea: "",
              residentialAddress: admissionInfo?.residentialAddress ?? "",
              regionOfResidence: admissionInfo?.regionOfResidence ?? "",
              nationalIDNumber: admissionInfo?.nationalIDNumber ?? "",
              nationalIDType: admissionInfo?.nationalIDType ?? "",
              nationality: authenticatedUser?.nationality ?? "",
              currentJob: admissionInfo?.currentJob ?? "",
              language: admissionInfo?.language ?? "",
              sex: admissionInfo?.sex ?? authenticatedUser?.sex ?? "",
              dob: admissionInfo?.dob ?? authenticatedUser?.dob ?? "",
              reference: admissionInfo?.reference ?? paymentInfo?.reference,
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
            onSubmit={async (values, helpers) => {
              try {
                console.log(values);
                helpers.setSubmitting(true);
                const res = await dispatch(
                  saveAdmissionPersonalProfile(values)
                );
                console.log(res);

                if (res?.meta?.requestStatus === "fulfilled") {
                  notify("Saved Successfully!", { type: "success" });

                  if (admissionInfo?.hasCompletedForm) {
                    setCombinedFormValues((prev) => ({ ...prev, ...values }));
                    setActiveForm(null);
                  } else {
                    navigate("/dashboard/apply/form#education");
                    document
                      .getElementById("education")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setCombinedFormValues((prev) => ({ ...prev, ...values }));
                    setActiveForm(Steps.EDUCATION);
                  }
                }
              } catch (error) {
                console.error(error);
              } finally {
                helpers.setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              resetForm,
              isSubmitting,
              errors,
              touched,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <h3 className="font-bold text-2xl mb-5 text-inherit">
                    Personal Profile
                  </h3>

                  <SectionIndicator
                    isActive={!disabledForms[Steps.PERSONAL]}
                    isComplete={admissionInfo?.hasCompletedForm}
                    isLoading={admissionInfoIsLoading}
                    sectionNumber={1}
                    activateFormHandler={editForm(Steps.PERSONAL)}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-center w-full mt-2 mb-6">
                  <FileUploadComponent
                    name="passportPhoto"
                    label="Click to add a picture"
                    sx={{ borderRadius: "50%" }}
                    inputSx={{ borderRadius: "50%" }}
                  />
                </div>

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
                    placeholder="E.g. English, Twi, Ga"
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
                    placeholder="e.g. Winneba Rd P. O. Box GP 501, Accra, Ghana"
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
                    name="residentialArea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.residentialArea}
                    placeholder="e.g, Kasoa, Gomoa, Effiduase, Kaneshie"
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
                      { name: "Ahafo region", value: "ahafo region" },
                      { name: "Ashanti region", value: "ashanti region" },
                      { name: "Bono East region", value: "bono east region" },
                      { name: "Bono region", value: "bono region" },
                      { name: "Central region", value: "central region" },
                      { name: "Eastern region", value: "eastern region" },
                      { name: "Northern region", value: "northern region" },
                      { name: "Oti region", value: "oti region" },
                      { name: "North East region", value: "north east region" },
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
                      {
                        name: "Ghana Card",
                        value: "ghana card",
                      },
                      {
                        name: "NHIS",
                        value: "NHIS",
                      },
                      {
                        name: "Drivers license",
                        value: "driver's license",
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
                    placeholder="e.g GHA-000937373-1"
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

                <div className="flex flex-row sm:flex-row gap-3 sm:gap-6 mt-4 items-center justify-end w-full">
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
                        type={"submit"}
                        text={
                          <TextSpinner
                            text="Save &amp; Continue"
                            loading={isSubmitting}
                          />
                        }
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
            enableReinitialize={true}
            initialValues={{
              preferredSchool:
                admissionInfo?.preferredSchool ?? "gh media school",
              preferredCourse: admissionInfo?.preferredCourse ?? "",
              courseSession: admissionInfo?.courseSession ?? "",
              priorExperience: admissionInfo?.priorExperience ?? "",
              priorExperienceSpecialization:
                admissionInfo?.priorExperienceSpecialization ?? "",
              source: admissionInfo?.source ?? "",
              reference: paymentInfo?.reference,
              // mobile2: "",
              previousSchoolInfo: [
                {
                  name: "",
                  yearAttended: "",
                  locationOfSchool: "",
                  qualification: "",
                },
              ],
            }}
            validationSchema={Yup.object({
              preferredSchool: validations
                .blank()
                .required("Preferred school is required"),
              preferredCourse: validations
                .blank()
                .required("Preferred course is required"),
              courseSession: validations
                .blank()
                .required("Preferred session is required"),
              source: validations
                .blank()
                .required("Referral source is required"),
            })}
            onSubmit={async (values, helpers) => {
              try {
                helpers.setSubmitting(true);
                const { previousSchoolInfo, priorExperience, ...rest } = values;
                const payload: { [x: string]: any } = { ...rest };

                previousSchoolInfo.forEach((schoolInfo, index) => {
                  payload[`nameOfSchoolAttended${index + 1}`] = schoolInfo.name;
                  payload[`locationOfSchoolAttended${index + 1}`] =
                    schoolInfo.locationOfSchool;
                  payload[`yearAttended${index + 1}`] = schoolInfo.yearAttended;
                  payload[`qualification${index + 1}`] =
                    schoolInfo.qualification;
                });

                console.log(payload);

                const res = await dispatch(
                  saveAdmissionEducation({
                    priorExperience: Boolean(priorExperience),
                    ...payload,
                  })
                );
                // console.log(res);

                if (res?.meta?.requestStatus === "fulfilled") {
                  notify("Saved Successfully!", { type: "success" });
                  if (admissionInfo?.hasCompletedForm) {
                    setCombinedFormValues((prev) => ({ ...prev, ...payload }));
                    setActiveForm(null);
                  } else {
                    navigate("/dashboard/apply/form#hospitality");
                    document
                      .getElementById("hospitality")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setCombinedFormValues((prev) => ({ ...prev, ...payload }));
                    setActiveForm(Steps.HOSPITALITY);
                  }
                }
              } catch (error) {
                console.error(error);
              } finally {
                helpers.setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              setValues,
              touched,
              errors,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-0 md:gap-6 items-start justify-between w-full mb-5">
                  <h3 className="font-bold text-2xl text-inherit">
                    Educational Information
                  </h3>

                  <SectionIndicator
                    isActive={!disabledForms[Steps.EDUCATION]}
                    isComplete={admissionInfo?.hasCompletedForm}
                    isLoading={admissionInfoIsLoading}
                    sectionNumber={2}
                    activateFormHandler={editForm(Steps.EDUCATION)}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b-2 mt-3 mb-4">
                  <h3 className="font-bold text-sm pb-2 text-inherit">
                    Previous Education
                  </h3>
                </div>

                {values?.previousSchoolInfo.map((schoolInfo, index) => (
                  <div
                    key={index}
                    className={mergeClassNames(
                      "flex flex-col md:flex-row gap-0 md:gap-5 items-start justify-between w-full",
                      index !== 0
                        ? "border-t md:border-t-0 mt-3 md:mt-0 pt-2 md:pt-0"
                        : ""
                    )}
                  >
                    <InputComponent
                      label={`School Name ${index + 1}`}
                      name={`previousSchoolInfo[${index}].name`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={schoolInfo?.name}
                      placeholder="e.g Accra Academy Senior High school"
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
                      placeholder="E.g. 2022"
                      sx={{ marginBottom: "10px" }}
                      width="100%"
                      type="number"
                      min={1960}
                      max={9999}
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
                      placeholder="e.g. Winneba Rd P. O. Box GP 501, Accra, Ghana"
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
                        {
                          name: "B.E.C.E",
                          value: "BECE",
                        },
                        {
                          name: "WASSCE",
                          value: "WASSCE",
                        },
                        {
                          name: "Degree",
                          value: "Degree",
                        },
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
                    text="+ Add Education"
                    style={{
                      // marginTop: "1px",
                      marginBottom: "10px",
                      padding: "10px",
                      backgroundColor: "transparent",
                      border: "1px solid transparent",
                      textTransform: "capitalize",
                      color: "dodgerblue",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                    onClick={(ev) => {
                      ev.preventDefault();
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

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b-2 mt-3 mb-4">
                  <h3 className="font-bold text-sm pb-2 text-inherit">
                    Other Information
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Select a School:"
                    name="preferredSchool"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    value={values?.preferredSchool}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    disabled={disabledForms[Steps.EDUCATION]}
                    options={([] as OptionProps[]).concat(
                      Object.keys(schoolCourses).map((each) => {
                        return {
                          name: each.toUpperCase(),
                          value: each?.toLowerCase(),
                        };
                      })
                    )}
                  />
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
                    ].concat(
                      schoolCourses?.[values.preferredSchool]?.courses.map(
                        (each) => {
                          return { name: each, value: each?.toLowerCase() };
                        }
                      )
                    )}
                  />

                  <SelectComponent
                    label="Preferred Course Session/Duration"
                    name="courseSession"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    required={true}
                    value={values?.courseSession}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.EDUCATION]}
                    options={[
                      { name: "- Choose a session -", value: "" },
                    ].concat(
                      schoolCourses?.[values.preferredSchool]?.sessions.map(
                        (each) => {
                          return { name: each, value: each?.toLowerCase() };
                        }
                      )
                    )}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Are you already into your field of application?"
                    name="priorExperience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.priorExperience}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    disabled={disabledForms[Steps.EDUCATION]}
                    options={[
                      { name: "Yes", value: "true" },
                      { name: "No", value: "false" },
                    ]}
                  />

                  <InputComponent
                    label="If yes, please kindly state your area(s) of specialization:"
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
                      {
                        name: "Television",
                        value: "fashion",
                      },
                      {
                        name: "Radio",
                        value: "radio",
                      },
                      {
                        name: "Facebook",
                        value: "facebook",
                      },
                      {
                        name: "Instagram",
                        value: "instagram",
                      },
                      { name: "Internet", value: "internet" },
                      {
                        name: "Referral - from friend, family or former student",
                        value: "referral",
                      },
                      {
                        name: "Others",
                        value: "other",
                      },
                    ]}
                  />
                </div>

                <div className="flex flex-row sm:flex-row gap-3 sm:gap-6 mt-4 items-center justify-end w-full">
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
                          document
                            .getElementById("personal")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setActiveForm(Steps.PERSONAL);
                        }}
                      />

                      <Button
                        type="submit"
                        text={
                          <TextSpinner
                            text="Save &amp; Continue"
                            loading={isSubmitting}
                          />
                        }
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
            enableReinitialize={true}
            initialValues={{
              hasMedicalCondition:
                admissionInfo?.hasMedicalCondition ??
                authenticatedUser?.hasMedicalCondition ??
                "false",
              medicalCondition:
                admissionInfo?.medicalCondition ??
                authenticatedUser?.medicalCondition ??
                "",
              hasDisability:
                admissionInfo?.hasDisability ??
                authenticatedUser?.hasDisability ??
                "false",
              disability:
                admissionInfo?.disability ??
                authenticatedUser?.disability ??
                "",
              sponsorRelationship: admissionInfo?.sponsorRelationship ?? "",
              sponsorOccupation: admissionInfo?.sponsorOccupation ?? "",
              preferHostel: admissionInfo?.preferHostel ?? "false",
              sponsorAddress: admissionInfo?.sponsorAddress ?? "",
              sponsorMobile: admissionInfo?.sponsorMobile ?? "",
              sponsorName: admissionInfo?.sponsorName ?? "",
              reference: paymentInfo?.reference,
            }}
            onSubmit={async (values, helpers) => {
              try {
                const {
                  preferHostel,
                  hasMedicalCondition,
                  hasDisability,
                  ...rest
                } = values;
                const payload: { [x: string]: any } = { ...rest };

                helpers.setSubmitting(true);
                console.log(payload);
                const res = await dispatch(
                  saveAdmissionWelfareInformation({
                    preferHostel: Boolean(preferHostel),
                    hasMedicalCondition: Boolean(hasMedicalCondition),
                    hasDisability: Boolean(hasDisability),
                    ...payload,
                  })
                );
                console.log(res);

                if (res?.meta?.requestStatus === "fulfilled") {
                  notify("Saved Successfully!", { type: "success" });
                  if (admissionInfo?.hasCompletedForm) {
                    setCombinedFormValues((prev) => ({ ...prev, ...values }));
                    setActiveForm(null);
                  } else {
                    setCombinedFormValues((prev) => ({ ...prev, ...values }));
                    setCompleted(true);
                    alert("Thanks a lot");
                    console.log(combinedFormValues);
                  }
                }
              } catch (error) {
                console.error(error);
              } finally {
                helpers.setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              resetForm,
              setValues,
              errors,
              touched,
              values,
            }) => (
              <form className="rounded-lg py-8 px-8" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <h3 className="font-bold text-2xl mb-5 text-inherit">
                    Welfare &amp; Sponsorship Information
                  </h3>

                  <SectionIndicator
                    isActive={!disabledForms[Steps.HOSPITALITY]}
                    isComplete={admissionInfo?.hasCompletedForm}
                    isLoading={admissionInfoIsLoading}
                    sectionNumber={3}
                    activateFormHandler={editForm(Steps.HOSPITALITY)}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b-2 mt-3 mb-4">
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
                      {
                        name: "No",
                        value: "false",
                      },
                      { name: "Yes", value: "true" },
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
                      {
                        name: "No",
                        value: "false",
                      },
                      { name: "Yes", value: "true" },
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
                      {
                        name: "No",
                        value: "false",
                      },
                      { name: "Yes", value: "true" },
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

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full border-b-2 mt-3 mb-4">
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
                      { name: "Siblings", value: "siblings" },
                      { name: "Friend", value: "friend" },
                      { name: "Acquaintance", value: "acquaintance" },
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
                    placeholder="e.g farmer, civil servant, banker etc"
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

                <div className="flex flex-row md:flex-row gap-3 md:gap-6 mt-4 items-center justify-end w-full">
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
                          document
                            .getElementById("education")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setActiveForm(Steps.EDUCATION);
                        }}
                      />

                      <Button
                        type="submit"
                        text={
                          <TextSpinner
                            text="Submit Application"
                            loading={isSubmitting}
                          />
                        }
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
    </>
  );
};

const Success = () => {
  return (
    <section className="flex flex-row items-center justify-center gap-5">
      <div className="flex flex-col flex-grow justify-center items-center text-center shadow-md rounded-xl gap-2.5 bg-white w-1/3 py-8 px-8 min-h-[350px]">
        <Lottie
          data={checkCircledLottie}
          loop={true}
          width={150}
          height={100}
        />

        <h3 className="font-bold text-xl mb-2 text-inherit capitalize">
          Admission form has been submitted successfully!
        </h3>

        <div
          className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full max-w-xl text-sm"
          style={{ color: "#7a7a7a" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          facilis earum aliquid voluptate. Unde consectetur odio expedita
          doloribus ea doloremque, distinctio non tenetur delectus, veritatis,
          accusantium animi. Iusto, sequi ut.
        </div>
      </div>
    </section>
  );
};

const SectionIndicator = ({
  isComplete,
  isActive,
  isLoading,
  sectionNumber,
  activateFormHandler,
}: {
  isComplete: boolean;
  isActive: boolean;
  isLoading: boolean;
  sectionNumber: number;
  activateFormHandler: (ev?: any) => void;
}) => {
  return !isComplete ? (
    <div
      className={mergeClassNames(
        "flex items-center justify-center w-[35px] h-[35px] border-2 border-white rounded-full text-md font-bold text-white transition delay-200 ease-in duration-300",
        !isActive ? "bg-gray-600" : "ring ring-[#21B591] bg-[#21B591]"
      )}
    >
      {<TextSpinner loading={isLoading} text={`${sectionNumber}`} />}
    </div>
  ) : (
    <button
      onClick={activateFormHandler}
      className={mergeClassNames(
        "flex items-center justify-center border-2 gap-2 border-white text-md font-bold text-[#21B591] transition delay-200 ease-in duration-300"
      )}
    >
      <AiOutlineEdit />
      <span>Edit</span>
    </button>
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

export default Application;
