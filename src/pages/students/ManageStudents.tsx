import { CellProps } from "react-table";
import React, { useEffect } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";

import { BsPeople as UserIcon } from "react-icons/bs";
import { AiOutlineMore as MoreIcon } from "react-icons/ai";

import PlainTable from "../../components/tables/PlainTable";
import MetricsCard from "../../components/cards/MetricsCard";

import { getUsers } from "../../redux/actions/users.action";
import ActionMenu from "../../components/common/ActionMenu";

function ManageStudents() {
  const dispatch = useDispatch<any>();
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const users = useSelector((state: StoreState) => state.User);

  console.log(academicSession);

  const column = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Middle Name",
      accessor: "middleName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Email Address",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "mobile",
    },
    {
      Header: "Nationality",
      accessor: "nationality",
    },
    {
      Header: "Sex",
      accessor: "sex",
    },
    {
      Header: "Created On",
      accessor: "createdAt",
    },
    {
      Header: "Actions",
      accessor: "0",
      Cell: ({ row }: CellProps<any>) => {
        // const { original } = row;

        return (
          <ActionMenu
            activator={<MoreIcon style={{ fontSize: "24px" }} />}
            menu={<div className="border p-5" style={{}}></div>}
          />
        );
      },
    },
  ];

  const data = users?.data;

  useEffect(() => {
    dispatch(getUsers({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-col sm:flex-row gap-5 overflow-auto pb-3">
        {[
          {
            title: "11.11 K",
            message: `Active Students`,
            icon: <UserIcon fontSize={28} />,
            color: "bg-green-600",
          },
          {
            title: "250.00 K",
            message: `Aspirants`,
            icon: <UserIcon fontSize={28} />,
            color: "bg-yellow-600",
          },
        ].map(({ title, icon, message, color }, i) => (
          <MetricsCard
            key={i}
            title={title}
            icon={icon}
            message={message}
            bgColorClass={color}
            style={{}}
          />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-xl mb-2">All Students</h3>
          <div className="flex rounded-lg border w-full min-h-72">
            <PlainTable
              data={data}
              columns={column}
              isLoading={users?.isLoading}
              sx={{ width: "100%" }}
            />
            {/* <TableControl */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageStudents;
