import { CellProps } from "react-table";
import React, { useEffect } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreState } from "../../redux/reducers";

import { AiOutlineMore as MoreIcon } from "react-icons/ai";
import { BsFileEarmarkText as PendingIcon } from "react-icons/bs";
import {
  BsFileCheck as ReviewedIcon,
  // BsFileEarmarkX as BlacklistedIcon,
} from "react-icons/bs";

import PlainTable from "../../components/tables/PlainTable";
import MetricsCard from "../../components/cards/MetricsCard";
import {
  getAllAdmissionForms,
  updateAdmissionForm,
} from "../../redux/actions/dashboard.action";
import ActionMenu from "../../components/common/ActionMenu";
import { notify } from "../../utils/toastNotification";

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
      accessor: "mobile1",
    },
    {
      Header: "Alt. Phone Number",
      accessor: "mobile2",
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
      Header: "Has Been Called?",
      accessor: "applicantHasBeenCalled",
      Cell: ({ row }: CellProps<any>) => {
        const { original } = row;
        return (
          <input
            type="checkbox"
            value={original?.applicantHasBeenCalled ? "Yes" : "No"}
            checked={original?.applicantHasBeenCalled}
          />
        );
      },
    },
    {
      Header: "Has Been Interviewed?",
      accessor: "interviewStatus",
      Cell: ({ row }: CellProps<any>) => {
        const { original } = row;
        return (
          <input
            type="checkbox"
            value={original?.interviewStatus}
            checked={original?.interviewStatus === "DONE"}
          />
        );
      },
    },
    {
      Header: "Actions",
      accessor: "0",
      Cell: ({ row }: CellProps<any>) => {
        const { original } = row;
        return (
          <ActionMenu
            activator={<MoreIcon style={{ fontSize: "24px" }} />}
            activatorClassName="hover:bg-slate-200"
            menu={
              <div className="flex flex-col" style={{}}>
                <button className="text-left px-3 py-2 border-b hover:bg-slate-200">
                  View Application
                </button>
                <button
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
                </button>

                <button
                  disabled={original?.interviewStatus === "DONE"}
                  className="ignore-default-styles text-left px-3 py-2 border-b hover:bg-slate-200"
                  onClick={async () => {
                    const res = await dispatch(
                      updateAdmissionForm({
                        formId: original?.formId,
                        userId: original?.userId,
                        interviewStatus: "DONE",
                        isEditable: false,
                      })
                    );
                    console.log(res);
                    if (res?.meta?.requestStatus === "fulfilled") {
                      notify("Success!", { type: "success" });
                      dispatch(getAllAdmissionForms({}));
                    }
                  }}
                >
                  Mark Applicant As Interviewed
                </button>
              </div>
            }
          />
        );
      },
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
            title: `${data?.length}`,
            message: `Total Applications`,
            icon: <PendingIcon fontSize={28} />,
            color: "bg-gray-400",
          },
          {
            title: `${
              data?.filter((a) => a?.interviewStatus === "DONE")?.length
            }`,
            message: `Interviewed Applicants`,
            icon: <ReviewedIcon fontSize={28} />,
            color: "bg-green-600",
          },
          {
            title: `${
              data?.filter((a) => a?.interviewStatus === "PENDING")?.length
            }`,
            message: `Pending Applications`,
            icon: <PendingIcon fontSize={28} />,
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
          <h3 className="font-bold text-xl mb-2">Admission Applications</h3>
          <div className="flex rounded-lg border w-full min-h-72">
            <PlainTable
              data={data}
              columns={column}
              isLoading={users?.isLoading}
              sx={{ width: "100%" }}
              onRowClick={(data) => {
                navigate(`/admin/dashboard/applicants/${data?.formId}`);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageApplicants;
