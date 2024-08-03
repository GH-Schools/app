import React, { useEffect } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";

import { BsPeople as UserIcon } from "react-icons/bs";

import { GenericObject } from "../../interfaces";
import PlainTable from "../../components/tables/PlainTable";
import { getUsers } from "../../redux/actions/users.action";
import { mergeClassNames } from "../../utils/utilities";

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
          {
            title: "1,000",
            message: `Graduated Students`,
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
            style={{

            }}
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

const MetricsCard = ({
  icon,
  title,
  style,
  message,
  bgColorClass,
}: {
  title: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
  style?: GenericObject;
  bgColorClass?: string;
}) => {
  return (
    <div
      className="flex flex-row sm:flex-col justify-start sm:justify-initial items-center flex-none gap-6 sm:gap-4 flex-grow shadow-md px-5 py-5 rounded-xl sm:rounded-2xl bg-white sm:max-w-[32%] min-w-[250px]"
      style={{ ...style }}
    >
      <div
        className={mergeClassNames(
          "flex items-center justify-center p-1 rounded-full text-white w-[85px] h-[85px] flex-none font-bold shadow-sm",
          bgColorClass ?? "bg-yellow-600"
        )}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-black items-start sm:items-center justify-center">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="flex text-xs font-medium text-gray-700 text-shadow-md">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
