import React, { useEffect, useState } from "react";
import { mergeClassNames } from "../../utils/utilities";

function ActionMenu({
  activator,
  menu,
}: {
  activator: React.ReactNode | JSX.Element;
  menu: React.ReactNode | JSX.Element;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.onload = () => {
      document.body.onclick = () => {
        alert("hey");
        setOpen(false);
      };
    };
  }, []);

  return (
    <div className="flex justify-center items-center relative">
      <button
        className="flex justify-center items-center hover:bg-slate-200 w-[40px] h-[40px] rounded-full"
        onClick={(ev) => {
          ev.stopPropagation();
          setOpen(!open);
        }}
      >
        {activator}
      </button>

      <div
        className={mergeClassNames(
          open ? "flex" : "hidden",
          "absolute border min-h-[20px] right-0 top-full bg-white shadow-xl"
        )}
        style={{ zIndex: +999, transform: "translateX(0%)" }}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        {menu}
      </div>
    </div>
  );
}

export default ActionMenu;
