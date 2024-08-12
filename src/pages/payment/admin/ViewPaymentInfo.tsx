import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { StoreState } from "../../../redux/reducers";
import {
  getSinglePayment,
  downloadPaymentReceipt,
} from "../../../redux/actions/payment.action";
import Button from "../../../components/common/Button";
import { GenericObject } from "../../../interfaces";
import TextIcon from "../../../components/common/TextIcon";

function ViewPaymentInfo() {
  const dispatch = useDispatch<any>();
  const urlParams = useParams();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile
  );

  const [paymentInfoIsLoading, setPaymentInfoIsLoading] =
    useState<boolean>(false);
  const [paymentInfo, setPaymentInfo] = useState<GenericObject | null>(null);

  console.log(authenticatedUser?.firstName);

  useEffect(() => {
    setPaymentInfoIsLoading(true);
    dispatch(getSinglePayment(urlParams?.payId!))
      .then((res: any) => {
        if (res?.meta?.requestStatus === "fulfilled" && res?.payload?.payload) {
          setPaymentInfo(res?.payload?.payload);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setPaymentInfoIsLoading(false);
      });
  }, [dispatch, urlParams?.payId]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      {!paymentInfoIsLoading ? (
        <section className="flex flex-row gap-5" key={paymentInfo?.payId}>
          <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
            <div className="rounded-lg border py-4 px-5">
              <div className="flex flex-row justify-between items-start mb-4">
                <h3 className="font-bold text-2xl">Payment Information</h3>

                <Button
                  text={
                    <TextIcon
                      text="Download Receipt"
                      icon={<AiOutlineDownload fontSize={20}/>}
                      size="sm"
                    />
                  }
                  onClick={() =>
                    dispatch(
                      downloadPaymentReceipt({ payId: paymentInfo?.payId })
                    )
                  }
                  style={{
                    backgroundColor: "#21B591",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                <FieldComponent
                  label="First Name"
                  value={paymentInfo?.User?.firstName ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />

                <FieldComponent
                  label="Middle Name"
                  value={paymentInfo?.User?.middleName ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />

                <FieldComponent
                  label="Last Name"
                  value={paymentInfo?.User?.lastName ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                <FieldComponent
                  label="Email Address"
                  value={paymentInfo?.User?.email ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />

                <FieldComponent
                  label="Mobile"
                  value={paymentInfo?.User?.mobile ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />

                <FieldComponent
                  label="Payment Reference"
                  value={paymentInfo?.reference ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                <FieldComponent
                  label="Nationality"
                  value={paymentInfo?.User?.nationality ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />

                <FieldComponent
                  label="Amount"
                  value={paymentInfo?.amount ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />

                <FieldComponent
                  label="Currency"
                  value={paymentInfo?.currency ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
                <FieldComponent
                  label="Mode of Payment"
                  value={paymentInfo?.source ?? "--"}
                  sx={{ marginBottom: "10px" }}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-row gap-5">
          <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-1/3 ">
            <h3 className="font-bold text-lg">Payment Information</h3>
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
  sx: any;
}> = ({ width, label, sx = {}, value = "", ...rest }) => {
  return (
    <div style={{ width, ...sx }}>
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
          padding: "10px 0px",
          width: "100%",
          borderRadius: "3px",
          // textTransform: "capitalize",
          // backgroundColor: "#F6FAFC",
        }}
        {...rest}
      >
        {value}
      </div>
    </div>
  );
};

export default ViewPaymentInfo;
