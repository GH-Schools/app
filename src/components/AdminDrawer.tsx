import { useNavigate } from "react-router-dom";
import {
  MdClose,
  MdExitToApp,
  // MdDashboard,
} from "react-icons/md";
// import { SiGoogleforms } from "react-icons/si";
import {
  RxDashboard as DashboardIcon,
  RxBell as InterviewIcon,
} from "react-icons/rx";
import { BsFillCreditCardFill as CardIcon } from "react-icons/bs";

import DrawerMenu from "./DrawerMenu";
import logo from "../assets/favicon.png";

type DrawerProps = {
  open: boolean;
  toggleHandler: (state: boolean) => any;
};

function Drawer({ open, toggleHandler }: DrawerProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col fixed ${
        !open ? "left-[-100vw]" : "left-0"
      } md:left-[unset] md:relative items-center p-6 md:w-[350px] w-[260px] h-full min-h-screen justify-between overflow-auto transition-all delay-0 duration-600 ease-in-out shadow-md`}
      style={{
        zIndex: "+9999",
        color: "var(--palette-color-contrast-1)",
        backgroundColor: "var(--palette-color-1)",
      }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-end w-full pb-2 md:hidden">
          <button onClick={toggleHandler(false)}>{<MdClose />}</button>
        </div>

        <img
          src={logo}
          alt="log"
          width={"100px"}
          height={"100px"}
          className="py-2"
          style={{ objectFit: "contain" }}
        />

        <nav className="flex flex-col w-full py-4">
          <DrawerMenu
            text="Overview"
            icon={<DashboardIcon />}
            href="/admin/dashboard"
          />

          <DrawerMenu text="Student Management" icon={<InterviewIcon />}>
            <DrawerMenu
              text="Manage Students"
              href="/admin/dashboard/students"
            />

            <DrawerMenu
              text="Manage Applicants"
              href="/admin/dashboard/applicants"
            />
          </DrawerMenu>

          <DrawerMenu text="Payments" icon={<CardIcon />}>
            <DrawerMenu
              text="View Receipts"
              href="/admin/dashboard/payment/view-receipt"
            />
            {/* <DrawerMenu text="Print Receipts" /> */}
          </DrawerMenu>
        </nav>
      </div>

      <nav className="flex flex-col w-full py-2">
        <DrawerMenu
          text="Log Out"
          icon={<MdExitToApp />}
          onClick={() => navigate("/admin-portal")}
        />
      </nav>
    </div>
  );
}

export default Drawer;
