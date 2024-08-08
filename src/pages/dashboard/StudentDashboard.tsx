import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { GenericObject } from "../../interfaces";

import { SiGoogleforms } from "react-icons/si";
import { BsFillCreditCardFill as CardIcon } from "react-icons/bs";

import { getAllSchedules } from "../../redux/actions/schedule.action";

import Button from "../../components/common/Button";
import TextSpinner from "../../components/TextSpinner";
import Notice, { theme as NoticeTheme } from "../../components/common/Notice";

import { getAuthUser } from "../../utils/storage";
import {
  getMyAdmissionForm,
  downloadAdmissionForm,
} from "../../redux/actions/dashboard.action";

function StudentDashboard() {
  const dispatch = useDispatch<any>();

  const admissionInfo = useSelector(
    (state: StoreState) => state?.Dashboard?.data?.[0]
  );

  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const scheduleInfo = useSelector((state: StoreState) => state.Schedule);
  const schedules = useMemo(
    () => scheduleInfo?.data ?? [],
    [scheduleInfo?.data]
  );

  const authUser = getAuthUser();

  let dateSchedules: GenericObject = {
    INTERVIEW: null,
    LECTURE: null,
    ORIENTATION: null,
  };
  console.log(academicSession, schedules, dateSchedules);

  dateSchedules = schedules
    .filter((sch) => Date.now() <= new Date(sch.dueDate).getTime())
    .reduce((aggregated, eachSchedule) => {
      return {
        ...aggregated,
        [eachSchedule.eventType]: new Date(
          eachSchedule.dueDate
        ).toLocaleString(),
      };
    }, dateSchedules);

  useEffect(() => {
    dispatch(getAllSchedules({}));
    if (authUser?.userId) {
      dispatch(
        getMyAdmissionForm({
          userId: authUser?.userId as string,
          silent: true,
        })
      );
    }
  }, [authUser?.userId, dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-6 pb-6 rounded-xl gap-2 bg-white w-full">
          <div className="flex flex-col mb-2">
            <h1 className="font-bold text-4xl text-black mb-2.5 capitalize">
              {`Welcome, ${authUser?.firstName}!`}
            </h1>
            <h4 className="text-gray-800 font-medium text-sm">
              Check out these announcements:
            </h4>
          </div>

          <div className="flex flex-col">
            {!admissionInfo?.hasCompletedForm && (
              <Notice
                variant="success"
                title="Info:"
                message={"You can now apply for admissions here"}
              >
                <Button
                  text={"Apply for Admission"}
                  href={"/student/dashboard/apply/form"}
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

            {admissionInfo?.hasCompletedForm && (
              <Notice
                variant="success"
                title="Info:"
                message={
                  "Click here to download a PDF copy of your admission form for your reference. We do not require you to bring a printed copy, as we are paperless."
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
          </div>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-5 overflow-auto pb-3">
        {[
          {
            title: "Next Interview Date",
            message: dateSchedules?.INTERVIEW
              ? `Your next interview date has been scheduled for ${
                  dateSchedules?.INTERVIEW ?? "Friday, 23rd July, 2024"
                }`
              : "Next interview date will be communicated",
            icon: <CardIcon />,
          },
          {
            title: "Orientation Date",
            message: dateSchedules?.ORIENTATION
              ? `Your orientation date has been scheduled for ${
                  dateSchedules?.ORIENTATION ?? "Friday, 23rd July, 2024"
                }`
              : "Orientation date will be communicated",
            icon: <SiGoogleforms />,
          },
          {
            title: "Lecture Resumption Date",
            message: dateSchedules?.LECTURE
              ? `Commencement of lecture has been scheduled for ${
                  dateSchedules?.LECTURE ?? "Friday, 23rd July, 2024"
                }`
              : "Lecture date will be communicated",
            icon: <CardIcon />,
          },
        ].map(({ title, icon, message }, i) => (
          <MetricsCard
            key={i}
            title={title}
            icon={
              <TextSpinner text={`${i + 1}`} loading={scheduleInfo.isLoading} />
            }
            message={scheduleInfo.isLoading ? "Loading..." : message}
          />
        ))}
      </section>

      {/* <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-6 pb-6 rounded-xl gap-2 bg-white">
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">
            loading...
          </div>
        </div>
      </section> */}
    </div>
  );
}

const MetricsCard = ({
  title,
  icon,
  message,
}: {
  title: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row sm:flex-col justify-start sm:justify-initial items-center flex-none gap-6 sm:gap-4 flex-grow shadow-md px-5 py-5 rounded-xl sm:rounded-2xl bg-green-600 sm:max-w-[32%] min-w-[250px]">
      <div className="flex items-center justify-center p-1 rounded-full text-white bg-gray-900 w-[35px] h-[35px] flex-none font-bold shadow-md">
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-white items-start sm:items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex text-xs font-medium text-left sm:text-center text-shadow-md">
          {message}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
