import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { MdSearch } from "react-icons/md";
import { AiOutlineUser as AvatarIcon } from "react-icons/ai";
import { RxHamburgerMenu as MenuIcon } from "react-icons/rx";
// import CustomInput from "./common/CustomInput";
import DropMenu, { EVENT_TYPES, PLACEMENT } from "./common/DropMenu";
import { StoreState } from "../redux/reducers";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../redux/actions/auth.action";
import { getCurrentSession } from "../redux/actions/app.action";

type HeaderProps = {
  toggleHandler: (state: boolean) => any;
};

function Header({ toggleHandler }: HeaderProps) {
  const dispatch = useDispatch<any>();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile
  );
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  console.log(academicSession);
  console.log(authenticatedUser?.firstName);

  useEffect(() => {
    dispatch(getCurrentSession());
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <header className="flex flex-row sm:flex-row gap-4 md:gap-5 px-6 sm:px-7 py-4 bg-white justify-between sm:items-center">
      <div className="flex flex-row items-center gap-3 w-full">
        <button className="block md:hidden" onClick={toggleHandler(true)}>
          <MenuIcon style={{ fontSize: "20px" }} />
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>

      <div className="flex flex-row justify-between items-center gap-6 w-auto">
        {/* <CustomInput
          startAdornment={<MdSearch />}
          placeholder="Search here..."
        /> */}
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
