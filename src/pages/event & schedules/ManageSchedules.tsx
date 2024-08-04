import React, { useEffect, useMemo } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { StoreState } from "../../redux/reducers";

import Button from "../../components/common/Button";
import PlainTable from "../../components/tables/PlainTable";

import { getAllSchedules } from "../../redux/actions/schedule.action";

function ManageSchedules() {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const schedules = useSelector((state: StoreState) => state.Schedule);

  console.log(academicSession, generateDateRowsAndColumns(7));

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

  useEffect(() => {
    dispatch(getAllSchedules({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <div className="flex flex-row justify-between items-center mb-1">
            <h3 className="font-bold text-xl mb-2">All Schedules</h3>
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

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <div className="flex flex-row justify-between items-center mb-1">
            <h3 className="font-bold text-xl mb-2">All Schedules</h3>
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
          <div className="flex rounded-lg border w-full">
            <Calendar />
          </div>
        </div>
      </section>
    </div>
  );
}

const Calendar = () => {
  const data = generateDateRowsAndColumns(new Date().getMonth());
  return (
    <div className="flex flex-row w-full gap-0.5 m-0.5">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
        (dateCol, columnIndex) => (
          <div className="flex flex-col flex-grow gap-0.5">
            <div className="border p-2 font-bold rounded-md">{dateCol}</div>
            {data.map((row, rowIndex) => (
              <div className="border p-2 min-h-[45px] flex-grow text-sm rounded-md">{data[rowIndex][columnIndex]}</div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

const generateDateRowsAndColumns = (month: number) => {
  type Row = number | null;
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), month, 1);
  const lastDay = new Date(today.getFullYear(), month + 1, 0);
  const initialPad = firstDay.getDay();
  const rowsAndCols: Row[][] = [];

  if (initialPad > 0) {
    rowsAndCols[0] = new Array(initialPad).fill(null) as Row[];
  }

  let rowCount = 0;

  for (let i = 1; i < lastDay.getDate(); i++) {
    if (rowsAndCols[rowCount].length < 7) {
      rowsAndCols[rowCount].push(i);
    } else {
      rowCount += 1;
      rowsAndCols[rowCount] = [i];
    }
  }

  const finalPad = 7 - rowsAndCols[rowCount].length;
  rowsAndCols[rowCount] = rowsAndCols[rowCount].concat(
    new Array(finalPad).fill(null)
  );

  return rowsAndCols;
};

export default ManageSchedules;
