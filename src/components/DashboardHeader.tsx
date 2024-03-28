import React from "react";
import CustomInput from "./common/CustomInput";
import { MdSearch } from "react-icons/md";

type HeaderProps = {
  toggleHandler: (state: boolean) => any;
};

function Header({ toggleHandler }: HeaderProps) {
  return (
    <header className="flex px-7 py-6 bg-white justify-between items-center">
      <h1 className="text-2xl font-bold" onClick={toggleHandler(true)}>
        Dashboard
      </h1>
      <div className="flex flex-row items-center gap-6">
        <CustomInput
          startAdornment={<MdSearch />}
          placeholder="Search here..."
        />
        <div className="bg-red-800 w-10 h-10 rounded-full"></div>
      </div>
    </header>
  );
}

export default Header;
