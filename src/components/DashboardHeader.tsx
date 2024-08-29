import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { MdSearch } from "react-icons/md";
import { AiOutlineUser as AvatarIcon } from "react-icons/ai";
import { RxHamburgerMenu as MenuIcon } from "react-icons/rx";
// import CustomInput from "./common/CustomInput";
// import DropMenu,  from "./common/DropMenu";
import { StoreState } from "../redux/reducers";
import { getUserProfile } from "../redux/actions/auth.action";
import { getCurrentSession } from "../redux/actions/app.action";
import ActionMenu, { EVENT_TYPES, PLACEMENT } from "./common/ActionMenu";
import Button from "./common/Button";

type HeaderProps = {
  toggleHandler: (state: boolean) => any;
};

function DashboardHeader({ toggleHandler }: HeaderProps) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile
  );
  const academicSession = useSelector(
    (state: StoreState) => state.App?.sessionInfo
  );

  console.log({ sessionId: academicSession?.data?.sessionId });
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
        <ActionMenu
          placement={PLACEMENT.AUTO}
          eventType={EVENT_TYPES.CLICK}
          // eventHandler={() => }
          activatorClassName={
            "bg-red-800 w-10 h-10 rounded-full flex items-center justify-center fill-white text-white"
          }
          activator={<AvatarIcon />}
          menu={
            <div className="flex flex-col bg-white">
              <Button
                text="Profile"
                className="text-left text-sm px-3 py-2 border-b hover:bg-slate-200 capitalize"
                onClick={() => {
                  navigate(
                    `/${
                      authenticatedUser?.role === "STUDENT"
                        ? "student"
                        : "admin"
                    }/dashboard/profile`
                  );
                }}
              />
              {/* <Button
                text="Profile"
                className="text-left text-sm px-3 py-2 border-b hover:bg-slate-200 capitalize"
                onClick={() => {
                  navigate("/student/dashboard/profile");
                }}
              />
              <Button
                text="Profile"
                className="text-left text-sm px-3 py-2 border-b hover:bg-slate-200 capitalize"
                onClick={() => {
                  navigate("/student/dashboard/profile");
                }}
              /> */}
            </div>
          }
        />
      </div>
    </header>
  );
}

export default DashboardHeader;
