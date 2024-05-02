import React from "react";
import CustomInput from "./common/CustomInput";
import { MdSearch } from "react-icons/md";
import { AiOutlineUser as AvatarIcon } from "react-icons/ai";
import DropMenu, { EVENT_TYPES, PLACEMENT } from "./common/DropMenu";

type HeaderProps = {
  toggleHandler: (state: boolean) => any;
};

function Header({ toggleHandler }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row gap-5 px-6 sm:px-7 py-6 bg-white justify-between sm:items-center">
      <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
        <button
          className="border block md:hidden"
          onClick={toggleHandler(true)}
        >
          nn
        </button>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex flex-row justify-between items-center gap-6 w-full sm:w-auto">
        <CustomInput
          startAdornment={<MdSearch />}
          placeholder="Search here..."
        />
        <DropMenu
          placement={PLACEMENT.BOTTOM}
          eventType={EVENT_TYPES.CLICK}
          activatorElement={
            <button className="bg-red-800 w-10 h-10 rounded-full flex items-center justify-center fill-white text-white">
              <AvatarIcon />
            </button>
          }
          // menuElement={<div className="bg-red-500 py-6 px-10 flex"></div>}
        />
      </div>
    </header>
  );
}

export default Header;
