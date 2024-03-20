import React, { MouseEventHandler, useState } from "react";
import {
  MdClose,
  MdDashboard,
  MdExitToApp,
  MdExpandLess,
  MdExpandMore,
  MdPayment,
} from "react-icons/md";
import logo from "../assets/favicon.png";

type DrawerMenuProps = {
  text: React.ReactNode | JSX.Element;
  icon?: React.ReactNode | JSX.Element;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const DrawerMenu = ({ children, text, icon, ...rest }: DrawerMenuProps) => {
  const [open, setOpen] = useState(false);

  const buttonClass =
    "flex flex-row p-2 justify-between items-center hover:bg-[rgba(0, 0, 0, 0.2)]";

  const Icon = () => (
    <div className="flex items-center justify-center min-w-[30px] min-h-[30px] mr-5 text-[1.375rem]">
      {icon}
    </div>
  );
  return children ? (
    <>
      <button className={buttonClass} {...rest}>
        <div className={"flex flex-row items-center mr-4"}>
          <Icon />
          <span className="text-left">{text}</span>
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
    <button className={buttonClass} {...rest}>
      <div className={`flex flex-row items-center mr-2`}>
        <Icon />
        <span className="text-left">{text}</span>
      </div>
    </button>
  );
};

function Drawer() {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="flex flex-col fixed md:relative items-center p-6 w-[360px] h-full min-h-screen justify-between overflow-auto"
      style={{
        backgroundColor: "var(--palette-color-1)",
        color: "var(--palette-color-contrast-1)",
      }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-end w-full pb-2 md:none">
          <button onClick={() => setOpen(false)}>
            <MdClose />
          </button>
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
          <DrawerMenu text="Overview" icon={<MdDashboard />} />
          <DrawerMenu text="Accounts" icon={<MdDashboard />}>
            <DrawerMenu text="Accounts" />
          </DrawerMenu>
          <DrawerMenu text="Payments" icon={<MdPayment />}>
            <DrawerMenu text="Accounts" />
          </DrawerMenu>
        </nav>
      </div>

      <nav className="flex flex-col w-full py-2">
        <DrawerMenu text="Log Out" icon={<MdExitToApp />} />
      </nav>
    </div>
  );
}

export default Drawer;
