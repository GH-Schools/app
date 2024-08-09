import React, { useEffect, useRef, useState } from "react";
import { mergeClassNames } from "../../utils/utilities";

function ActionMenu({
  activator,
  menu,
}: {
  activator: React.ReactNode | JSX.Element;
  menu: React.ReactNode | JSX.Element;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center relative" ref={menuRef}>
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
