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
  // FileUploadComponent,
} from "../../components/common/FormComponents";
import Modal from "../../components/modals/Modal";
import Button from "../../components/common/Button";
import Lottie from "../../components/common/Lottie";
import TextSpinner from "../../components/TextSpinner";
import Notice, { theme as NoticeTheme } from "../../components/common/Notice";

import { StoreState } from "../../redux/reducers";
import { getAuthUser } from "../../utils/storage";
import { validations } from "../../utils/validations";
import {
  getMyAdmissionForm,
  downloadAdmissionForm,
  saveAdmissionEducation,
  saveAdmissionPersonalProfile,
  saveAdmissionWelfareInformation,
} from "../../redux/actions/dashboard.action";
import { getMyPayments } from "../../redux/actions/payment.action";

import logo from "../../assets/favicon.png";
import checkCircledLottie from "../../assets/lotties/check_circled.lottie.json";

import { NATIONS, REGIONS, schoolCourses } from "../../constants/data";
import { OptionProps } from "../../interfaces";

import { notify } from "../../utils/toastNotification";
import { mergeClassNames } from "../../utils/utilities";
import {
  schoolArrayToObject,
  schoolObjectToArray,
} from "../../utils/admissionForm";

function Application() {
  const [completed, setCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch<any>();

  const admissionInfoIsLoading = useSelector(
    (state: StoreState) => state?.Dashboard?.isLoading
  );

  const admissionInfo = useSelector(
    (state: StoreState) => state?.Dashboard?.data?.[0]
  );

  const paymentInfo = useSelector((state: StoreState) => state?.Payment);

  return (
    <>
      <div className="flex flex-col gap-7 my-5 mx-5" style={{ color: "#111" }}>
        <div className="flex flex-col">
          {admissionInfo?.hasCompletedForm && (
            <Notice
              variant="success"
              title="Info:"
              message={
                "Success! You can now download a PDF copy of your admission form for your reference. We do not require you to bring a printed copy, as we are paperless."
              }
            >
              <Button
                text={"Download PDF"}
                onClick={() =>
                  dispatch(
                    downloadAdmissionForm({ formId: admissionInfo?.formId })
                  )
                }
                className="text-center font-bold"
                style={{
                  whitSpace: "nowrap",
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

          {!paymentInfo?.payments?.[0] && !paymentInfo?.isLoading && (
            <Notice
              variant="error"
              title="Error:"
              message={"We could not find payment information for this account"}
            >
              <Button
                text={"Contact Support"}
                href="/student/dashboard/contact-us"
                className="text-center font-bold"
                style={{
                  whitSpace: "nowrap",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: NoticeTheme.error.title.color,
                  textTransform: "capitalize",
                }}
              />
            </Notice>
          )}
        </div>

        {!completed ? <Form setCompleted={setCompleted} /> : <Success />}
      </div>

      {!admissionInfo && !admissionInfoIsLoading && (
        <Modal open={openModal}>
          <div className="flex flex-col items-center w-[95%] sm:w-[65vw] h-[88vh] overflow-y-auto sm:px-3">
            <img
              src={logo}
              alt="log"
              width={"70px"}
              height={"70px"}
              className="py-2"
              style={{ objectFit: "contain" }}
            />

            <h2 className="font-bold text-slate-900 text-2xl uppercase mb-2 w-full border-b pb-3 text-center">
              Rule &amp; Regulations
            </h2>

            <div className="flex flex-col gap-4 mt-0 w-full">
              <Notice
                title="Notice"
                message={
                  "All applicants are expected to read and understand the rules and regulation governing his/her school of application before proceeding with filling the application form. Kindly click the button at the bottom of this page to proceed to the forms page when you are done."
                }
              />

              <fieldset className="flex flex-col flex-grow gap-2 px-3 pb-6 border-t rounded-lg">
                <legend className="text-base uppercase font-bold py-1 pl-1 pr-2 text-slate-900">
                  Bye-laws governing gh media school
                </legend>

                <div className="flex gap-1 flex-col text-xs font-normal mt-1 py-2 px-3 border bg-orange-400 text-white border-orange-500 rounded-md">
                  {/* <span className="font-bold text-white">Kindly Note:</span>{" "} */}
                  <span className="font-semibold">
                    All laws listed below are applicable to all GH Media School
                    applicants
                  </span>
                </div>

                <ul
                  style={{ listStyleType: "circle" }}
                  className="flex flex-col gap-4 pl-5"
                >
                  {[
                    {
                      heading: "Compliance with school rules and regulation",
                      text: "Every student is entitled to the acquaintance with the rules and regulations governing the school and is expected to comply by them accordingly. Breach of the rules shall warrant sanctions like warning, suspension, dismissal",
                    },
                    {
                      heading: "Student liability for damage",
                      text: "Students are by these rules encouraged to handle all school properties and equipment with care. Improper handling, damage or loss of school properties would require their replacement or payment by the student.",
                    },
                    {
                      heading: "Attachment",
                      text: (
                        <>
                          Brilliant and deserving students will be assisted by
                          the school to gain attachment in reputable media
                          institutions. Those who do not fall in the stated
                          category would have to find attachment by their own
                          means.
                          <ul
                            style={{ listStyleType: "square" }}
                            className="pl-4"
                          >
                            <li>School fees.</li>
                            <li>
                              Students are expected to fully pay their school
                              fees before the commencement of the end of
                              semester exam.
                            </li>
                            <li>
                              Accumulation of fees by the end of the year will
                              warrant the withholding of students’ certificate
                              on completion of the course.
                            </li>
                            <li>
                              Students shall accept any timely increment in
                              school fees.
                            </li>
                            <li>
                              Foreign applicants are required to pay fees in
                              full prior to their studies.
                            </li>
                            <li>Fees paid are not refundable.</li>
                          </ul>
                        </>
                      ),
                    },
                    {
                      heading: "Regularity & Punctuality",
                      text: "Students should attend every lecture and be on time to avoid lateness. Failure to attend lectures regularly reliefs the administration from aiding to put you on attachment, students who miss lectures for 3 consecutive days should not expect administration to aid in their attachment.",
                    },
                    {
                      heading: "Project work",
                      text: "Since our courses are 70% practical, students must prepare in “time” and “finance” for any travelling, staying on set for certain number of days, or practical aimed at enhancing their course in school. Students will also be required to complete specific projects by different lectures during studies.",
                    },
                    {
                      heading: "Compulsory church service",
                      text: "Every student must be present during church service. It is compulsory for all. Information and announcements are given during this session, which is relevant to all students. Refusal to attend would call for an unpleasant sanction.",
                    },
                    {
                      heading: "Use of school property",
                      text: "Use of school properties like studio equipment, facilities etc. must be done with the appropriate permission and relevant documentation from authorities. NOTE: Students must be ready to accept other interim bye laws which may emerge from time to time during the cause of study",
                    },
                    {
                      heading: "Subjection to disciplinary actions",
                      text: "Any offender of the stipulated rules should be willing to subject himself to any form of disciplinary action proposed by the school authorities, disciplinary committee or the SRC executives without complaint or protest.",
                    },
                    {
                      heading: "Good behaviour",
                      text: "Every student is expected to put up a good and accommodating behavior with a high level of comportment, courtesy, discipline, and good moral values.",
                    },
                    {
                      heading: "Academic Performance",
                      text: (
                        <>
                          <ul
                            style={{ listStyleType: "square" }}
                            className="pl-4"
                          >
                            <li>
                              Students are expected to study hard to avoid
                              abject failure in their exams.
                            </li>
                            <li>
                              Failing in 3 or more subject in a semester will
                              warrant outright withdrawal from the school. Fees
                              paid would not to be refundable
                            </li>
                            <li>
                              Failing in 1 or 2 subjects would necessitate
                              re-sitting. Failure to re-sit by the following
                              semester would mandate withdrawal.
                            </li>
                            <li>
                              Students are expected to meet at least an average
                              academic performance (Both in theory and
                              practical’s) to be eligible for graduation.
                            </li>
                            <li>
                              Rampant absence from class without any authentic
                              and verified reason would affect ones eligibility
                              to graduate after school.
                            </li>
                            <li>
                              Continuing students who only report to school
                              after mid-semester exams would be withdrawn from
                              the school automatically.
                            </li>
                          </ul>
                        </>
                      ),
                    },
                    {
                      heading:
                        "Full and active perticipation in school activities",
                      text: "Every member is encouraged to play active role in the school’s activities - for example, participation in SRC week celebration and elections, group work, church services, sports and other extra curricula activities.",
                    },
                    {
                      heading: "Copyright",
                      text: "The student must accept that any productions including film, video, soundtracks, writing, recording and any other products from students’ projects and works whiles in school shall vest in GH Media School to whom all copyright and ownership belong and without whose permission, there shall be no use of such works. GH Media School also holds the sole right to show or broadcast any of her students’ work at her own time and sole discretion.",
                    },
                    {
                      heading: "Respect for student leadership",
                      text: "Every student must be ready to accord the student leadership (SRC), the respect due it. They must also comply with bye-laws which would emerge from their end to help ensure sanity in school.",
                    },
                  ].map((each, ii) => (
                    <li key={ii} className="flex-grow w-full">
                      <h4 className="text-sm text-slate-900 font-semibold capitalize mb-2">
                        {each?.heading}
                      </h4>

                      <div className="text-xs font-normal leading-6 text-slate-900">
                        {each?.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <fieldset className="flex flex-col flex-grow gap-2 px-3 pb-6 border-t rounded-lg">
                <legend className="text-base uppercase font-bold py-1 pl-1 pr-2 text-slate-900">
                  GH Cosmetology School Rules &amp; Regulations
                </legend>

                <div className="flex flex-col gap-1 text-xs font-normal mt-1 py-2 px-3 border bg-orange-400 text-white border-orange-500 rounded-md">
                  {/* <span className="font-semibold text-white">Kindly Note:</span>{" "} */}
                  <span className="font-medium">
                    GH Cosmetology School reserves the right and the prerogative
                    to sanction and / or terminate the training of any student
                    who breaches these rules and regulation during their stay in
                    the school. Other bye-laws would be duly communicated to
                    students to aid and regulate better teaching and learning
                    environment.
                  </span>
                </div>

                <ul
                  style={{ listStyleType: "circle" }}
                  className="flex flex-col gap-4 pl-5"
                >
                  {[
                    {
                      heading: "Discipline and personal hygiene",
                      text: "Discipline and personal hygiene is of utmost importance to the academy therefore all student must look very neat and smart always. Indecently dressed students will not be allowed inside the school premises.",
                    },
                    {
                      heading: "Student to model for each other",
                      text: "During practical sessions, student are expected to model for each other. If for any reason a student cannot do so, by reason of any medical codition, he or she must notify the school on enrollment with necessary evidence.",
                    },
                    {
                      heading: "Prescribed dress code appearance",
                      text: (
                        <>
                          In a bid to inculcate a Professional apperance in
                          students, they are to be in the prescribed uniforms at
                          all times. <br /> All students must wear the
                          prescribed school uniform:
                          <ul
                            style={{ listStyleType: "square" }}
                            className="pl-4"
                          >
                            <li>
                              <b>Uniforms: </b>School Lacoste and school cloth.
                              No mufti and unprescribed uniforms would be
                              allowed.
                            </li>
                            <li>
                              <b>
                                Footwear (BLACK, BROWN, or WHITE loafers/flat
                                shoes):{" "}
                              </b>
                              No talking shoes or high heeled footwears are
                              allowed.
                            </li>
                            <li>
                              <b>Accessories: </b>With the exception of wedding
                              rings and earrings, no other form of accesories or
                              body jewelries are allowed during and around
                              classes' hours.
                            </li>
                          </ul>
                        </>
                      ),
                    },
                    {
                      heading: "Class attendance",
                      text: "Punctuality and regularity to class must be ensured. The instructor reserves every right to sanction late comers accordingly.",
                    },
                    {
                      heading: "Appearance during practical",
                      text: "Students must ensure that during practical hours, they wear overalls or aprons. No student will be permitted to work without it, hence, will not be allowed in class.",
                    },
                    {
                      heading: "School property",
                      text: "Students are expected to handle all school properties including tools and equipment with a sense of responsibilty or else damages caused to any school property is payable.",
                    },
                  ].map((each, ii) => (
                    <li key={ii} className="flex-grow w-full">
                      <h4 className="text-sm text-slate-900 font-semibold capitalize mb-2">
                        {each?.heading}
                      </h4>

                      <div className="text-xs font-normal leading-6 text-slate-900">
                        {each?.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <fieldset className="flex flex-col flex-grow gap-2 px-3 pb-6 border-t rounded-lg">
                <legend className="text-base uppercase font-bold py-1 pl-1 pr-2 text-slate-900">
                  GH Fashion School rules &amp; regulation
                </legend>

                <div className="flex flex-col gap-1 text-xs font-normal mt-1 py-2 px-3 border bg-blue-400 text-white border-blue-500 rounded-md">
                  {/* <span className="font-semibold text-white">Kindly Note:</span>{" "} */}
                  <span className="font-medium">
                    GH Fashion School reserves the right and the prerogative to
                    sanction and / or terminate the training of any student who
                    breaches these rules and regulation during their stay in the
                    school. Other bye laws would be duly communicated to
                    students to aid and regulate better teaching and learning
                    environment
                  </span>
                </div>

                <ul
                  style={{ listStyleType: "circle" }}
                  className="flex flex-col gap-4 pl-5"
                >
                  {[
                    {
                      heading: "Discipline and personal hygiene",
                      text: "Discipline and personal hygiene is of utmost importance to the academy therefore all student must look very neat and smart always. Indecently dressed students will not be allowed inside the school premises.",
                    },
                    {
                      heading: "Student to model for each other",
                      text: "During practical sessions, student are expected to model for each other. If for any reason a student cannot do so, by reason of any medical codition, he or she must notify the school on enrollment with necessary evidence.",
                    },
                    {
                      heading: "Prescribed dress code appearance",
                      text: (
                        <>
                          In a bid to inculcate a Professional apperance in
                          students, they are to be in the prescribed uniforms at
                          all times. <br /> All students must wear the
                          prescribed school uniform:
                          <ul
                            style={{ listStyleType: "square" }}
                            className="pl-4"
                          >
                            <li>
                              <b>Uniforms: </b>School Lacoste and school cloth.
                              No mufti and unprescribed uniforms would be
                              allowed.
                            </li>
                            <li>
                              <b>
                                Footwear (BLACK, BROWN, or WHITE loafers/flat
                                shoes):{" "}
                              </b>
                              No talking shoes or high heeled footwears are
                              allowed.
                            </li>
                            <li>
                              <b>Accessories: </b>With the exception of wedding
                              rings and earrings, no other form of accesories or
                              body jewelries are allowed during and around
                              classes' hours.
                            </li>
                          </ul>
                        </>
                      ),
                    },
                    {
                      heading: "Class attendance",
                      text: "Punctuality and regularity to class must be ensured. The instructor reserves every right to sanction late comers accordingly.",
                    },
                    {
                      heading: "Appearance during practical",
                      text: "Students must ensure that during practical hours, they wear overalls or aprons. No student will be permitted to work without it, hence, will not be allowed in class.",
                    },
                    {
                      heading: "School property",
                      text: "Students are expected to handle all school properties including tools and equipment with a sense of responsibilty or else damages caused to any school property is payable.",
                    },
                  ].map((each, ii) => (
                    <li key={ii} className="flex-grow w-full">
                      <h4 className="text-sm text-slate-900 font-semibold capitalize mb-2">
                        {each?.heading}
                      </h4>

                      <div className="text-xs font-normal leading-6 text-slate-900">
                        {each?.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </fieldset>
            </div>

            <div className="fixed flex gap-4 justify-center p-4 w-full bg-slate-100 bottom-0 border-t">
              <Button
                text={"Accept & Continue"}
                onClick={() => setOpenModal(!openModal)}
                className="text-center font-bold shadow-lg"
                style={{
                  whitSpace: "nowrap",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: NoticeTheme.success.title.color,
                  textTransform: "capitalize",
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
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
      dispatch(
        getMyAdmissionForm({
          userId: authenticatedUser?.userId as string,
          silent: true,
        })
      );
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
              residentialArea: admissionInfo?.areaOfResidence ?? "",
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
              language: validations.blank().required("Language is required"),
              regionOfResidence: validations
                .blank()
                .required("Region of residence is required"),
              residentialArea: validations
                .blank()
                .required("Area of residence is required"),
              nationality: validations
                .blank()
                .required("Nationality is required"),
              // nationalIDNumber: validations
              //   .blank()
              //   .required("National ID number is required"),
            })}
            onSubmit={async (values, helpers) => {
              try {
                const { residentialArea, ...payload } = values;
                console.log(values);
                helpers.setSubmitting(true);
                const res = await dispatch(
                  saveAdmissionPersonalProfile({
                    ...payload,
                    areaOfResidence: residentialArea,
                  })
                );
                console.log(res);

                if (res?.meta?.requestStatus === "fulfilled") {
                  notify("Saved Successfully!", { type: "success" });

                  if (admissionInfo?.hasCompletedForm) {
                    setCombinedFormValues((prev) => ({ ...prev, ...values }));
                    setActiveForm(null);
                  } else {
                    navigate("/student/dashboard/apply/form#education");
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

                {/* <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-center w-full mt-2 mb-6">
                  <FileUploadComponent
                    name="passportPhoto"
                    label="Click to add a picture"
                    sx={{ borderRadius: "50%" }}
                    inputSx={{ borderRadius: "50%" }}
                  />
                </div> */}

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
                    disabled={
                      disabledForms[Steps.PERSONAL] || !!values?.firstName
                    }
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
                    disabled={
                      disabledForms[Steps.PERSONAL] || !!values?.lastName
                    }
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
                    required={true}
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
                    required={true}
                    options={[
                      { name: "- Choose a country -", value: "" },
                    ].concat(
                      NATIONS.map((nation) => ({
                        name: nation.name,
                        value: nation.nationality_type,
                      }))
                    )}
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
                    required={true}
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
                    required={true}
                    options={[
                      { name: "- Choose a region -", value: "" },
                    ].concat(
                      REGIONS.map((region) => ({
                        name: region.name,
                        value: region.value,
                      }))
                    )}
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
                    required={false}
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
                      {
                        name: "Others",
                        value: "others",
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
                    required={false}
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
              courseSession: admissionInfo?.session ?? "",
              priorExperience: admissionInfo?.priorExperience ?? "",
              priorExperienceSpecialization:
                admissionInfo?.priorExperienceSpecialization ?? "",
              source: admissionInfo?.source ?? "",
              reference: paymentInfo?.reference,
              // mobile2: "",
              previousSchoolInfo: schoolObjectToArray(admissionInfo),
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
                const payload: { [x: string]: any } = {
                  ...rest,
                  ...schoolArrayToObject(previousSchoolInfo),
                };

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
                    navigate("/student/dashboard/apply/form#hospitality");
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
                      required={index === -1}
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
                      required={index === -1}
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
                      required={index === -1}
                      disabled={disabledForms[Steps.EDUCATION]}
                    />

                    <InputComponent
                      label={`Qualification ${index + 1}`}
                      name={`previousSchoolInfo[${index}].qualification`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={schoolInfo?.qualification}
                      sx={{ marginBottom: "10px" }}
                      width="100%"
                      placeholder="Type a qualification e.g. BECE, WASSCE, Degree"
                      // options={[
                      //   { name: "- Choose a qualification -", value: "" },
                      //   {
                      //     name: "B.E.C.E",
                      //     value: "BECE",
                      //   },
                      //   {
                      //     name: "WASSCE",
                      //     value: "WASSCE",
                      //   },
                      //   {
                      //     name: "Degree",
                      //     value: "Degree",
                      //   },
                      // ]}
                      required={index === -1}
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
                          navigate("/student/dashboard/apply/form#personal");
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
              preferHostel: admissionInfo?.preferHostel ?? "false",
              sponsorRelationship: admissionInfo?.sponsorRelationship ?? "",
              sponsorOccupation: admissionInfo?.sponsorOccupation ?? "",
              sponsorAddress: admissionInfo?.sponsorAddress ?? "",
              sponsorMobile: admissionInfo?.sponsorMobile ?? "",
              sponsorName: admissionInfo?.sponsorName ?? "",
              reference: paymentInfo?.reference,
            }}
            validationSchema={Yup.object({
              sponsorName: validations
                .name("Sponsor name")
                .required("Sponsor name is required"),
              sponsorRelationship: validations
                .blank()
                .required("Sponsor relationship is required"),
              sponsorMobile: validations
                .mobile("Sponsor mobile")
                .required("Sponsor mobile is required"),
              sponsorOccupation: validations
                .blank()
                .required("Sponsor occupation is required"),
            })}
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
                    // alert("Thanks a lot");
                    console.log(combinedFormValues);
                    dispatch(
                      getMyAdmissionForm({
                        userId: authenticatedUser?.userId as string,
                      })
                    );
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
                    required={true}
                    disabled={disabledForms[Steps.HOSPITALITY]}
                  />

                  <InputComponent
                    label="Relationship With Sponsor"
                    name="sponsorRelationship"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.sponsorRelationship}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    disabled={disabledForms[Steps.HOSPITALITY]}
                    placeholder="Type relationship here e.g. father, friend..."
                    // options={[
                    //   { name: "- Choose relationship -", value: "" },
                    //   { name: "Father", value: "father" },
                    //   { name: "Mother", value: "mother" },
                    //   { name: "Siblings", value: "siblings" },
                    //   { name: "Friend", value: "friend" },
                    //   { name: "Acquaintance", value: "acquaintance" },
                    // ]}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
                          navigate("/student/dashboard/apply/form#education");
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
          Admission application is being processed and you will soon receive a
          call from the front desk as soon as your interview date has been
          scheduled. Visit your dashboard to see the next interview dates and
          other important dates. If you have any questions, do not hesitate to
          reach out to the front desk.
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
