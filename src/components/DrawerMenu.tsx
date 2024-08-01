import React, { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";

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

export default DrawerMenu;
