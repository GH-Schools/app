import React from "react"; // { useEffect }
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";

import { SiGoogleforms } from "react-icons/si";
import {
  BsExclamationCircle,
  BsFillCreditCardFill as CardIcon,
} from "react-icons/bs";
import Notice from "../../components/common/Notice";
import Button from "../../components/common/Button";

const MetricsCard = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row flex-none gap-4 flex-grow shadow-sm px-5 py-6 rounded-2xl bg-gray--500 bg-red-800 text-red-900">
      <div className="flex items-center justify-center p-1 rounded-full bg-gray--700 bg-red--900 bg-white w-[50px] h-[50px] flex-none">
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-white">
        <h3 className="font-bold">{title}</h3>
        <div className="flex text-xs font-normal">Lorem ipsum dolr</div>
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
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-6 pb-6 rounded-xl gap-2 bg-white w-full">
          <div className="flex flex-col mb-2">
            <h1 className="font-bold text-4xl text-black mb-2.5">
              Welcome Back, Annie!
            </h1>
            <h4 className="text-gray-800 font-medium text-sm">
              Check out these announcements:
            </h4>
          </div>

          <div className="flex flex-col">
            <Notice
              variant="success"
              title="Success:"
              message={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid pariatur ex aut dicta corporis in, fuga earum adipisci, vel eum, dolorum minima laudantium. Ad, ex temporibus debitis harum ullam error."
              }
            >
              {/* <Button
                text={"Apply for Admission"}
                className="text-center font-bold"
                style={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#e7a94b",
                  textTransform: "capitalize",
                }}
              /> */}
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

      <section className="flex flex-row gap-5 overflow-auto">
        {[
          { title: "Payments", icon: <CardIcon /> },
          { title: "View Profile", icon: <SiGoogleforms /> },
          { title: "Metric 3", icon: <CardIcon /> },
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
