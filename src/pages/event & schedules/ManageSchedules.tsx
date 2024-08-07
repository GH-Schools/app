import React, { useEffect, useMemo, useState } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoReload as SwapIcon } from "react-icons/io5";
import { StoreState } from "../../redux/reducers";

import Button from "../../components/common/Button";
import PlainTable from "../../components/tables/PlainTable";

import { getAllSchedules } from "../../redux/actions/schedule.action";
import Calendar, { type CalendarEvent } from "../../components/Calendar";

function ManageSchedules() {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();
  const [today, setToday] = useState(new Date());
  const [calendarView, setCalendarView] = useState(true);

  const schedules = useSelector((state: StoreState) => state.Schedule);
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  console.log(academicSession);

  const column = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Due Date",
      accessor: "dueDate",
    },
    {
      Header: "Event Type",
      accessor: "eventType",
    },
    {
      Header: "Created On",
      accessor: "createdAt",
    },
    {
      Header: "Actions",
      accessor: "0",
    },
  ];

  const data = useMemo(() => schedules?.data ?? [], [schedules?.data]);

  const setPrev = () => {
    setToday(
      (prev) =>
        new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate())
    );
  };

  const setNext = () => {
    setToday(
      (prev) =>
        new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate())
    );
  };

  useEffect(() => {
    dispatch(getAllSchedules({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      {calendarView ? (
        <section className="flex flex-row gap-5">
          <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
            <div className="flex flex-row justify-between items-center mb-1">
              <div className="flex flex-row items-center gap-1 mb-2">
                <Button
                  text={<SwapIcon />}
                  onClick={() => {
                    setCalendarView(false);
                  }}
                  className="text-center font-bold bg-green-600"
                  style={{
                    color: "#21B591",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "5px",
                    borderRadius: "5px",
                    textTransform: "capitalize",
                  }}
                />
                <h3 className="font-bold text-xl">All Schedules</h3>
              </div>

              <Button
                text={"+ Add Schedule"}
                href={`/admin/dashboard/schedules/create`}
                className="text-center font-bold bg-green-600"
                style={{
                  color: "#21B591",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  textTransform: "capitalize",
                }}
              />
            </div>
            <div className="flex rounded-lg w-full gap-2">
              <Calendar
                day={today.getDate()}
                month={today.getMonth()}
                year={today.getFullYear()}
                setPrev={setPrev}
                setNext={setNext}
                events={
                  data.map((schedule) => {
                    return {
                      title: schedule?.title,
                      date: new Date(schedule?.dueDate),
                      color:
                        schedule.eventType !== "INTERVIEW" ? "gray" : "orange",
                      metadata: {
                        ...schedule,
                      },
                    };
                  }) as CalendarEvent[]
                }
              />

              {/* <Calendar
                day={today.getDate()}
                month={today.getMonth() + 1}
                year={today.getFullYear()}
                setPrev={setPrev}
                setNext={setNext}
                events={
                  data.map((schedule) => {
                    return {
                      title: schedule?.title,
                      date: new Date(schedule?.dueDate),
                      color:
                        schedule.eventType !== "INTERVIEW" ? "gray" : "orange",
                      metadata: {
                        ...schedule,
                      },
                    };
                  }) as CalendarEvent[]
                }
              /> */}
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-row gap-5">
          <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
            <div className="flex flex-row justify-between items-center mb-1">
              <div className="flex flex-row items-center gap-1 mb-2">
                <Button
                  text={<SwapIcon />}
                  onClick={() => {
                    setCalendarView(true);
                  }}
                  className="text-center font-bold bg-green-600"
                  style={{
                    color: "#21B591",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "5px",
                    borderRadius: "5px",
                    textTransform: "capitalize",
                  }}
                />
                <h3 className="font-bold text-xl">All Schedules</h3>
              </div>

              <Button
                text={"+ Add Schedule"}
                href={`/admin/dashboard/schedules/create`}
                className="text-center font-bold bg-green-600"
                style={{
                  color: "#21B591",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  textTransform: "capitalize",
                }}
              />
            </div>

            <div className="flex rounded-lg border w-full min-h-72">
              <PlainTable
                data={data}
                columns={column}
                isLoading={schedules?.isLoading}
                sx={{ width: "100%" }}
              />
              {/* <TableControl */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ManageSchedules;
