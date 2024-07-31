import React, { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdClose,
  // MdDashboard,
  MdExitToApp,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import { RxDashboard as DashboardIcon } from "react-icons/rx";
import { SiGoogleforms } from "react-icons/si";
import { BsFillCreditCardFill as CardIcon } from "react-icons/bs";

import logo from "../assets/favicon.png";

type DrawerProps = {
  open: boolean;
  toggleHandler: (state: boolean) => any;
};

type DrawerMenuProps = {
  href?: string;
  children?: React.ReactNode;
  text: React.ReactNode | JSX.Element;
  icon?: React.ReactNode | JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const DrawerMenu = ({
  children,
  text,
  icon,
  href = "#",
  onClick,
  ...rest
}: DrawerMenuProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const buttonClass =
    "flex flex-row p-2 justify-between items-center hover:bg-[#ffffff29] focus:bg-[#ffffff19] focus:border-l-2 focus:border-[#ffffff99]";

  const Icon = () => (
    <div className="flex items-center justify-center min-w-[30px] min-h-[30px] mr-4 text-[1.375rem]">
      {icon}
    </div>
  );

  const onClickHandler = (ev: any) => {
    return onClick && typeof onClick === "function"
      ? onClick(ev)
      : navigate(href);
  };

  return children ? (
    <>
      <button
        className={buttonClass}
        onClick={onClickHandler}
        title={href}
        {...rest}
      >
        <div className={"flex flex-row items-center mr-4 font-medium"}>
          <Icon />
          <span className="text-left text-sm">{text}</span>
        </div>

        <button
          className="p-1 rounded-full text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </button>
      {open && children}
    </>
  ) : (
    <button
      className={buttonClass}
      onClick={onClickHandler}
      title={href}
      {...rest}
    >
      <div className={`flex flex-row items-center mr-2 font-medium`}>
        <Icon />
        <span className="text-left text-sm">{text}</span>
      </div>
    </button>
  );
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
            href="/dashboard"
          />
          <DrawerMenu text="My Applications" icon={<SiGoogleforms />}>
            <DrawerMenu text="Admissions Form" href="/dashboard/apply/form" />
            {/* <DrawerMenu text="Track Status" /> */}
          </DrawerMenu>
          <DrawerMenu text="Payments" icon={<CardIcon />}>
            <DrawerMenu
              text="View Receipts"
              href="/dashboard/payment/view-receipt"
            />
            {/* <DrawerMenu text="Print Receipts" /> */}
          </DrawerMenu>
        </nav>
      </div>

      <nav className="flex flex-col w-full py-2">
        <DrawerMenu
          text="Log Out"
          icon={<MdExitToApp />}
          onClick={() => navigate("/portal")}
        />
      </nav>
    </div>
  );
}

export default Drawer;
