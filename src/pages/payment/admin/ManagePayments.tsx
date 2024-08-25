import React, { useEffect, useMemo } from "react"; //
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreState } from "../../../redux/reducers";

import { AiOutlineMore as MoreIcon } from "react-icons/ai";
import {
  BsCreditCard as OnlinePaymentIcon,
  BsCashStack as FrontDeskIcon,
  BsCashCoin as TotalIcon,
} from "react-icons/bs";

import PlainTable from "../../../components/tables/PlainTable";
import MetricsCard from "../../../components/cards/MetricsCard";
import { getAllPayments } from "../../../redux/actions/payment.action";
import ActionMenu, { PLACEMENT } from "../../../components/common/ActionMenu";
import { CellProps } from "react-table";
import Button from "../../../components/common/Button";

function ManagePayments() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const paymentInfo = useSelector((state: StoreState) => state?.Payment);

  console.log(academicSession);

  const column = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "User.firstName",
    },
    {
      Header: "Last Name",
      accessor: "User.lastName",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
    {
      Header: "Phone Number",
      accessor: "User.mobile",
    },
    {
      Header: "Payment Source",
      accessor: "source",
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
            placement={PLACEMENT.AUTO}
            edgeOffset={44}
            activator={<MoreIcon style={{ fontSize: "24px" }} />}
            menu={
              <div className="flex flex-col" style={{}}>
                <Button
                  className="text-left px-3 py-2 border-b hover:bg-slate-200 capitalize"
                  href={`/admin/dashboard/payment/${original?.payId}`}
                  text="View Payment"
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

  const data = useMemo(
    () => paymentInfo?.payments ?? [],
    [paymentInfo?.payments]
  );

  useEffect(() => {
    dispatch(getAllPayments({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-col sm:flex-row gap-5 overflow-auto pb-3">
        {[
          {
            title: `${data?.length}`,
            message: `Total Payments`,
            icon: <TotalIcon fontSize={28} />,
            color: "bg-gray-400",
          },
          {
            title: `${data?.length}`,
            message: `Online Payments`,
            icon: <OnlinePaymentIcon fontSize={28} />,
            color: "bg-yellow-500",
          },
          {
            title: `${0}`,
            message: `Front Desk Payments`,
            icon: <FrontDeskIcon fontSize={28} />,
            color: "bg-orange-600",
          },
        ].map(({ title, icon, message, color }, i) => (
          <MetricsCard
            key={i}
            title={title}
            icon={icon}
            message={message}
            bgColorClass={color}
          />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-xl mb-2">All Payments</h3>
          <div className="flex rounded-lg border w-full min-h-72">
            <PlainTable
              data={data}
              columns={column}
              isLoading={paymentInfo?.isLoading}
              sx={{ width: "100%" }}
              onRowClick={(data) => {
                navigate(`/admin/dashboard/payment/${data?.payId}`);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManagePayments;
