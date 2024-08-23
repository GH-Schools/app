import React, { useEffect, useMemo, useState } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CellProps } from "react-table";
import { AiOutlineMore as MoreIcon } from "react-icons/ai";
import { IoReload as SwapIcon } from "react-icons/io5";
import { StoreState } from "../../redux/reducers";

import Button from "../../components/common/Button";
import PlainTable from "../../components/tables/PlainTable";
import ActionMenu from "../../components/common/ActionMenu";
import Calendar, { type CalendarEvent } from "../../components/Calendar";

import { getAllSchedules } from "../../redux/actions/schedule.action";
import Modal from "../../components/modals/Modal";
import { EventView } from "./modal-contents/Index";
import { GenericObject } from "../../interfaces";

function ManageSchedules() {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();
  const [today, setToday] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [calendarView, setCalendarView] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<GenericObject | null>(
    null
  );

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
      Cell: ({ row }: CellProps<any>) => {
        const { original } = row;
        return (
          <ActionMenu
            activator={<MoreIcon style={{ fontSize: "24px" }} />}
            menu={
              <div className="flex flex-col" style={{}}>
                <Button
                  className="text-left px-3 py-2 border-b hover:bg-slate-200 capitalize"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedEvent(original!);
                  }}
                  text="Edit"
                />

                {/* <button
                  disabled={original?.applicantHasBeenCalled}
                  className="ignore-default-styles text-left px-3 py-2 border-b hover:bg-slate-200"
                  onClick={async () => {
                    const res = await dispatch(
                      updateAdmissionForm({
                        formId: original?.formId,
                        userId: original?.userId,
                        applicantHasBeenCalled: true,
                      })
                    );
                    console.log(res);
                    if (res?.meta?.requestStatus === "fulfilled") {
                      notify("Success!", { type: "success" });
                      dispatch(getAllAdmissionForms({}));
                    }
                  }}
                >
                  Mark Applicant As Called
                </button> */}
              </div>
            }
          />
        );
      },
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
                eventClickHandler={(data) => () => {
                  setOpenModal(true);
                  setSelectedEvent((Array.isArray(data) ? data[0] : data)!);
                }}
                events={
                  data.map((schedule) => {
                    return {
                      title: schedule?.title,
                      date: new Date(schedule?.dueDate),
                      color:
                        schedule.eventType !== "INTERVIEW"
                          ? "dodgerblue"
                          : "orange",
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

      <Modal open={openModal} toggleHandler={() => setOpenModal(!openModal)}>
        {selectedEvent && <EventView data={selectedEvent} />}
      </Modal>
    </div>
  );
}

export default ManageSchedules;
