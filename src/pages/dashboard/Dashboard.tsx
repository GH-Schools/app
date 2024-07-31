import React from "react"; // { useEffect }
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";

import { SiGoogleforms } from "react-icons/si";
import {
  // BsExclamationCircle,
  BsFillCreditCardFill as CardIcon,
} from "react-icons/bs";
import Notice, { theme as NoticeTheme } from "../../components/common/Notice";
import Button from "../../components/common/Button";
import { getAuthUser } from "../../utils/storage";

function Dashboard() {
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
              Check out these announcements:
            </h4>
          </div>

          <div className="flex flex-col">
            <Notice
              variant="success"
              title="Info:"
              message={"You can now apply for admissions here"}
            >
              <Button
                text={"Apply for Admission"}
                href={"/dashboard/apply/form"}
                className="text-center font-bold"
                style={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: NoticeTheme.success.title.color,
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
            title: "Next Interview Date",
            message: `Your next interview date has been scheduled for Friday, 23rd July, 2024`,
            icon: <CardIcon />,
          },
          {
            title: "Orientation Date",
            message: `Date will be communicated`,
            icon: <SiGoogleforms />,
          },
          {
            title: "Lecture Resumption Date",
            message: `Lecture Resumption Date`,
            icon: <CardIcon />,
          },
        ].map(({ title, icon, message }, i) => (
          <MetricsCard key={i} title={title} icon={`${i + 1}`} message={message} />
        ))}
      </section>

      {/* <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-3/5 ">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">
            loading...
          </div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-6 pb-6 rounded-xl gap-2 bg-white">
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
      </section> */}
    </div>
  );
}

const MetricsCard = ({
  title,
  icon,
  message,
}: {
  title: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row sm:flex-col flex-none gap-4 flex-grow shadow-md px-5 py-5 rounded-2xl bg-green-600 sm:max-w-[32%] min-w-[250px]">
      <div className="flex items-center justify-center p-1 rounded-full text-white bg-gray-900 w-[35px] h-[35px] flex-none font-bold shadow-md">
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex text-xs font-medium text-left text-shadow-md">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
