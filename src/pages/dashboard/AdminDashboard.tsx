import React from "react"; // { useEffect }
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";

// import { SiGoogleforms } from "react-icons/si";
import {
  BsPeople as UserIcon,
  BsFileEarmarkText as CardIcon,
  // BsFillCreditCardFill as CardIcon,
  BsCalendarWeek as EventIcon
} from "react-icons/bs";
import Notice, { theme as NoticeTheme } from "../../components/common/Notice";
import Button from "../../components/common/Button";
import { getAuthUser } from "../../utils/storage";
import { GenericObject } from "../../interfaces";

function AdminDashboard() {
  // const dispatch = useDispatch<any>();
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  const authUser = getAuthUser();

  console.log(academicSession);

  // useEffect(() => {
  //   dispatch(get());
  // }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-6 pb-6 rounded-xl gap-2 bg-white w-full">
          <div className="flex flex-col mb-2">
            <h1 className="font-bold text-4xl text-black mb-2.5 capitalize">
              {`Welcome, ${authUser?.firstName}!`}
            </h1>
            <h4 className="text-gray-800 font-medium text-sm">
              Check these notifications:
            </h4>
          </div>

          <div className="flex flex-col">
            <Notice
              variant="warn"
              title="Schedule Notification:"
              message={"You have 3 pending interviews today"}
            >
              <Button
                text={"Check Schedule"}
                href={"/admin/dashboard/schedules"}
                className="text-center font-bold"
                style={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: NoticeTheme.warn.title.color,
                  textTransform: "capitalize",
                }}
              />
            </Notice>

            {/* <Notice
              variant="warn"
              title="Warning:"
              message={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid pariatur ex aut dicta corporis in, fuga earum adipisci, vel eum, dolorum minima laudantium. Ad, ex temporibus debitis harum ullam error."
              }
            >
              <Button
                text={"Apply for Admission"}
                className="text-center font-bold"
                style={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#31B5A7",
                  textTransform: "capitalize",
                }}
              />
            </Notice> */}

            {/* <Notice
              variant="error"
              title="Error:"
              message={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid pariatur ex aut dicta corporis in, fuga earum adipisci, vel eum, dolorum minima laudantium. Ad, ex temporibus debitis harum ullam error."
              }
            >
              <Button
                text={"Apply for Admission"}
                className="text-center font-bold"
                style={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#31B5A7",
                  textTransform: "capitalize",
                }}
              />
            </Notice> */}
          </div>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-5 overflow-auto pb-3">
        {[
          {
            title: "11.11 K",
            message: `Active Students`,
            icon: <UserIcon fontSize={28} />,
          },
          {
            title: "250.00 K",
            message: `Total Applications`,
            icon: <CardIcon fontSize={28} />,
          },
          {
            title: "3",
            message: `Upcoming Events`,
            icon: <EventIcon fontSize={28} />,
          },
        ].map(({ title, icon, message }, i) => (
          <MetricsCard
            key={i}
            title={title}
            icon={icon}
            message={message}
            style={{
              // alignItems: "center",
              // justifyContent: "center",
            }}
          />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-lg">Recent Activities</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            Coming Soon...
          </div>
        </div>
      </section>

      {/* <section className="flex flex-row gap-5">
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
      </section> */}
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
      className="flex flex-row sm:flex-col justify-start sm:justify-initial items-center flex-none gap-6 sm:gap-4 flex-grow shadow-md px-5 py-5 rounded-xl sm:rounded-2xl bg-yellow-600 sm:max-w-[32%] min-w-[250px]"
      style={{ ...style }}
    >
      <div className="flex items-center justify-center p-1 rounded-full text-white bg-yellow-900 w-[85px] h-[85px] flex-none font-bold shadow-sm">
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-white items-start sm:items-center justify-center text-center">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="flex text-xs font-medium text-inherit text-shadow-md">
          {message}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
