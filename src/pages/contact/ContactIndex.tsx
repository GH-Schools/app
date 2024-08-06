import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { getMyPayments } from "../../redux/actions/payment.action";
import { GenericObject } from "../../interfaces";
import { BsMap as LocationIcon } from "react-icons/bs";

function ContactIndex() {
  const dispatch = useDispatch<any>();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile
  );

  const paymentInfo = useSelector((state: StoreState) => state?.Payment);

  console.log(authenticatedUser);

  useEffect(() => {
    dispatch(getMyPayments({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      {!paymentInfo?.isLoading ? (
        paymentInfo?.payments.map((payment, i) => (
          <section className="flex flex-row gap-5" key={payment?.payId ?? i}>
            <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
              <div className="rounded-lg border py-4 px-5">
                <div className="flex flex-row justify-between items-start mb-4">
                  <h3 className="font-bold text-2xl">Contact Information</h3>
                </div>

                <div
                  className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-center bg-slate-100 w-full h-[80px] border rounded-md text-sm"
                  style={{ marginBottom: "12px" }}
                >
                  View on map
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <FieldComponent
                    icon={<LocationIcon style={{ fontSize: "18px" }} />}
                    label="Location"
                    value={payment?.User?.firstName}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <FieldComponent
                    label="First Name"
                    value={payment?.User?.firstName}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <FieldComponent
                    label="Middle Name"
                    value={payment?.User?.middleName ?? "--"}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <FieldComponent
                    label="Last Name"
                    value={payment?.User?.lastName}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <FieldComponent
                    label="Email Address"
                    value={payment?.User?.email}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <FieldComponent
                    label="Mobile"
                    value={payment?.User?.mobile}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <FieldComponent
                    label="Payment Reference"
                    value={payment?.reference}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                  <FieldComponent
                    label="Nationality"
                    value={payment?.User?.nationality ?? "--"}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <FieldComponent
                    label="Amount"
                    value={payment?.amount}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />

                  <FieldComponent
                    label="Currency"
                    value={payment?.currency}
                    sx={{ marginBottom: "10px" }}
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="flex flex-row gap-5">
          <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-1/3 ">
            <h3 className="font-bold text-lg">Contact Information</h3>
            <div className="flex flex-col items-center justify-center rounded-lg border w-full min-h-72">
              {`Loading payments...`}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const FieldComponent: React.FC<{
  width: string;
  label: string;
  value: string;
  sx?: GenericObject;
  icon?: any;
}> = ({ width, label, sx = {}, value = "", icon, ...rest }) => {
  return (
    <div
      className="flex flex-row gap-2 items-center text-lg"
      style={{ width, ...sx }}
    >
      {icon}
      <div className="w-full">
        <span
          style={{
            width: "auto",
            fontSize: "12px",
            fontWeight: 500,
            color: "#818793",
            marginBottom: "3px",
            textTransform: "capitalize",
          }}
        >
          {label}
        </span>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            padding: "5px 0px",
            width: "100%",
            // borderRadius: "3px",
            // textTransform: "capitalize",
            // backgroundColor: "#F6FAFC",
          }}
          {...rest}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default ContactIndex;
