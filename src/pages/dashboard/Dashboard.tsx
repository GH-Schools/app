import React from "react"; // { useEffect }
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/reducers";
// import { getCurrentSession } from "../../redux/actions/app.action";
// import { useDispatch } from "react-redux";
import { BsExclamationCircle } from "react-icons/bs";
import {
  MdClose,
  // MdDashboard,
  MdExitToApp,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { BsFillCreditCardFill as CardIcon } from "react-icons/bs";

const MetricsCard = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row flex-none gap-4 flex-grow shadow-sm px-4 py-6 rounded-2xl bg-gray-500 text-white">
      <div className="flex items-center justify-center p-1 rounded-full bg-gray-700 w-[50px] h-[50px] flex-none">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">{title}</h3>
        <div className="flex text-white text-xs font-normal">
          Lorem ipsum dolr
        </div>
      </div>
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
            borderRadius: "8px",
            // maxWidth: "380px",
            backgroundColor: "#FFFDED",
          }}
        >
          <div className="flex flex-row items-center ">
            <BsExclamationCircle
              style={{ color: "#313131", fontSize: "12px" }}
            />
            <span
              className="ml-2"
              style={{ color: "#313131", fontSize: "12px", fontWeight: 600 }}
            >
              Note:
            </span>
          </div>

          <span style={{ color: "#616161", fontSize: "12px" }}>Welcome</span>

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

      <section className="flex flex-row gap-5 overflow-auto">
        {[
          { title: "Payments", icon: <CardIcon /> },
          { title: "View Profile", icon: <SiGoogleforms /> },
          { title: "Metric 3", icon: <CardIcon /> },
          // { title: "Metric 4", icon: <CardIcon /> },
        ].map(({ title, icon }, i) => (
          <MetricsCard key={i} title={title} icon={icon} />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-6 pb-6 rounded-xl gap-2 bg-white">
          {/* <h3 className="font-bold text-lg">Metric</h3> */}
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>

        {/* <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div> */}
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
