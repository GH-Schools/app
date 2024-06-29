import { Formik } from "formik";
import React from "react";
import InputComponent from "../../components/common/InputComponent";

function Application() {
  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            initialValues={{
              firstName: "",
              middleName: "",
              lastName: "",
            }}
            onSubmit={(values, helpers) => {}}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <form
                className="rounded-lg border py-4 px-5"
                onSubmit={handleSubmit}
              >
                <h3 className="font-bold text-xl mb-4">Personal Profile</h3>

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
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Email Address"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Address"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <InputComponent
                    label="Nationality"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
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
                  />

                  <InputComponent
                    label="Region of Residence"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <InputComponent
                    label="Sex"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <InputComponent
                    label="Date of Birth"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.firstName}
                    placeholder="E.g. Temiloluwa"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    type="date"
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            initialValues={{
              firstName: "",
              middleName: "",
              lastName: "",
            }}
            onSubmit={(values, helpers) => {}}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <form
                className="rounded-lg border py-4 px-5"
                onSubmit={handleSubmit}
              >
                <h3 className="font-bold text-xl mb-4">
                  Education Information
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
                  />
                </div>

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
                  />

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
                  />

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
                  />
                </div>

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
                  />
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
