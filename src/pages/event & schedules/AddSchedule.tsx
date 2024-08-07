import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  InputComponent,
  SelectComponent,
} from "../../components/common/FormComponents";
import Button from "../../components/common/Button";
import TextSpinner from "../../components/TextSpinner";

import { validations } from "../../utils/validations";
import { createSchedule } from "../../redux/actions/schedule.action";

import { notify } from "../../utils/toastNotification";

function AddSchedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  return (
    <div className="flex flex-col gap-7 my-5 mx-5" style={{ color: "#111" }}>
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-md rounded-xl gap-2 bg-white w-1/3 ">
          <Formik
            enableReinitialize={true}
            initialValues={{
              title: "",
              dueDate: "",
              type: "",
            }}
            validationSchema={Yup.object({
              title: validations.name("Title").required("Title is required"),
              type: validations.blank().required("Category is required"),
              dueDate: validations.blank().required("Due date is required"),
            })}
            onSubmit={async (values, helpers) => {
              try {
                console.log(values);
                helpers.setSubmitting(true);
                const res = await dispatch(createSchedule(values));
                console.log(res);

                if (res?.meta?.requestStatus === "fulfilled") {
                  notify("Saved Successfully!", { type: "success" });
                  navigate("/admin/dashboard/schedules");
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
                    Add New Schedule
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <SelectComponent
                    label="Schedule Category"
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.type}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                    options={[
                      { name: "- Choose a schedule category -", value: "" },
                      { name: "Interview", value: "INTERVIEW" },
                      { name: "Lecture", value: "LECTURE" },
                      { name: "Orientation", value: "ORIENTATION" },
                      { name: "Custom", value: "CUSTOM" },
                    ]}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.title}
                    placeholder="E.g. Academic Resumption Date"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                    required={true}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-start justify-between w-full">
                  <InputComponent
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values?.dueDate}
                    // placeholder="E.g. temiloluwa@gmail.com"
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>

                <div className="flex flex-row sm:flex-row gap-3 sm:gap-6 mt-4 items-center justify-end w-full">
                  <Button
                    text="Cancel"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid lightgray",
                      textTransform: "capitalize",
                      color: "#555",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                    onClick={() => navigate("/admin/dashboard/schedules")}
                  />

                  <Button
                    type={"submit"}
                    text={<TextSpinner text="Create" loading={isSubmitting} />}
                    style={styles.proceedBtn}
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

const styles = {
  proceedBtn: {
    backgroundColor: "#21B591",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
};

export default AddSchedule;
