import React from // { useEffect }
"react";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/reducers";
// import { getCurrentSession } from "../../redux/actions/app.action";
// import { useDispatch } from "react-redux";
import { BsExclamationCircle } from "react-icons/bs";

const MetricsCard = () => {
  return (
    <div className="flex flex-grow shadow-sm p-6 rounded-xl bg-orange-500 text-white font-bold">
      Metric
    </div>
  );
};

function Dashboard() {
  // const dispatch = useDispatch<any>();
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  console.log(academicSession);

  // useEffect(() => {
  //   dispatch(getCurrentSession());
  // }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-col gap-5">
        <div
          className="flex flex-row p-4 gap-3 w-full"
          style={{
            backgroundColor: "#EDFFFD",
            borderRadius: "8px",
            // maxWidth: "380px",
          }}
        >
          <div className="flex flex-row items-center ">
            <BsExclamationCircle
              style={{ color: "#31B5A7", fontSize: "12px" }}
            />
            <span
              className="ml-2"
              style={{ color: "#31B5A7", fontSize: "12px" }}
            >
              Note
            </span>
          </div>

          <span style={{ color: "#5D8F8D", fontSize: "12px" }}>Welcome</span>

          <div className="flex flex-row items-center ml-auto">
            <span
              className="text-center"
              style={{ color: "#31B5A7", fontSize: "12px" }}
            >
              Apply for Admission
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        {[1, 2, 3, 4].map((a, i) => (
          <MetricsCard key={i} />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-1/3 ">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">
            loading...
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
