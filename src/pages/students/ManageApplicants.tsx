import React, { useEffect } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreState } from "../../redux/reducers";

// import { SiGoogleforms } from "react-icons/si";
import {
  BsHouse as UserIcon,
  BsFillCreditCardFill as CardIcon,
} from "react-icons/bs";

import { GenericObject } from "../../interfaces";
import PlainTable from "../../components/tables/PlainTable";
import { getAllAdmissionForms } from "../../redux/actions/dashboard.action";

function ManageApplicants() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const users = useSelector((state: StoreState) => state.Dashboard);

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
    dispatch(getAllAdmissionForms({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-col sm:flex-row gap-5 overflow-auto pb-3">
        {[
          {
            title: "11.11 K",
            message: `Pending Applications`,
            icon: <UserIcon fontSize={28} />,
          },
          {
            title: "250.00 K",
            message: `Reviewed Applications`,
            icon: <CardIcon fontSize={28} />,
          },
          {
            title: "1,000",
            message: `Blacklisted Applications`,
            icon: <UserIcon fontSize={28} />,
          },
        ].map(({ title, icon, message }, i) => (
          <MetricsCard
            key={i}
            title={title}
            icon={icon}
            message={message}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-xl mb-2">Admission Applications</h3>
          <div className="flex rounded-lg border w-full min-h-72">
            <PlainTable
              data={data}
              columns={column}
              isLoading={users?.isLoading}
              sx={{ width: "100%" }}
              onRowClick={(data) => {
                navigate(`/admin/dashboard/applicants/${data?.formId}`)
              }}
            />
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
}: {
  title: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
  style?: GenericObject;
}) => {
  return (
    <div
      className="flex flex-row sm:flex-col flex-none gap-4 flex-grow shadow-md px-5 py-5 rounded-2xl bg-white sm:max-w-[32%] min-w-[250px]"
      style={{ ...style }}
    >
      <div className="flex items-center justify-center p-1 rounded-full text-white bg-gray-900 w-[85px] h-[85px] flex-none font-bold shadow-sm">
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-black items-center justify-center text-center">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="flex text-xs font-medium text-inherit text-shadow-md">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ManageApplicants;
