import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { getMyPayments } from "../../redux/actions/payment.action";

function ViewPaymentReceipt() {
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
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-1/3 ">
          <h3 className="font-bold text-lg">Payment Information</h3>
          <div className="flex flex-col items-center justify-center rounded-lg border w-full min-h-72">
            {paymentInfo?.isLoading
              ? `loading...`
              : paymentInfo?.payments.map((payment) => (
                  <pre>{JSON.stringify(payment, null, 2)}</pre>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewPaymentReceipt;
