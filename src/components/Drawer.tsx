import { useNavigate } from "react-router-dom";
import {
  MdClose,
  MdExitToApp,
  // MdDashboard,
  MdOutlineHelpCenter as SupportIcon,
} from "react-icons/md";
// import { SiGoogleforms } from "react-icons/si";
import { RxDashboard as DashboardIcon } from "react-icons/rx";
import {
  BsCreditCard as CardIcon,
  BsFileEarmarkText as ApplicationIcon,
} from "react-icons/bs";

import DrawerMenu from "./DrawerMenu";
import logo from "../assets/favicon.png";
import { mergeClassNames } from "../utils/utilities";

type DrawerProps = {
  open: boolean;
  toggleHandler: (state: boolean) => any;
};

function Drawer({ open, toggleHandler }: DrawerProps) {
  const navigate = useNavigate();

  return (
    <div
      className={mergeClassNames(
        `flex flex-col justify-between items-start fixed md:relative md:w-[400px] w-[100%]`,
        !open ? "left-[-100vw]" : "left-0",
        `md:left-[unset] h-full min-h-screen shadow-md`
      )}
      style={{
        zIndex: "+9999",
        backgroundColor: "#0006",
      }}
    >
      <div
        className={mergeClassNames(
          `flex flex-col justify-between items-center relative md:w-[100%] w-[300px]`,
          !open ? "left-[-100vw]" : "left-0",
          `md:left-[unset] p-6 h-full min-h-screen overflow-auto transition-all delay-0 duration-600 ease-in-out shadow-md`
        )}
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
              text="Dashboard"
              icon={<DashboardIcon />}
              href="/student/dashboard"
            />
            <DrawerMenu text="My Applications" icon={<ApplicationIcon />}>
              <DrawerMenu
                text="Admissions Form"
                href="/student/dashboard/apply/form"
              />
              {/* <DrawerMenu text="Track Status" /> */}
            </DrawerMenu>
            <DrawerMenu text="Payments" icon={<CardIcon />}>
              <DrawerMenu
                text="View Receipts"
                href="/student/dashboard/payment/view-receipt"
              />
              {/* <DrawerMenu text="Print Receipts" /> */}
            </DrawerMenu>
          </nav>
        </div>

        <nav className="flex flex-col w-full py-2">
          <DrawerMenu
            text="Contact Center"
            icon={<SupportIcon />}
            href="/student/dashboard/contact-us"
          />
          <DrawerMenu
            text="Log Out"
            icon={<MdExitToApp />}
            onClick={() => navigate("/portal")}
          />
        </nav>
      </div>
    </div>
  );
}

export default Drawer;
