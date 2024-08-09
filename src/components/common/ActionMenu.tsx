import React, {
  useCallback,
  useEffect,
  useRef,
} from "react";
import useMenu from "../../hooks/useMenu";
// import { mergeClassNames } from "../../utils/utilities";

function ActionMenu({
  activator,
  menu,
}: {
  activator: React.ReactNode | JSX.Element;
  menu: React.ReactNode | JSX.Element;
}) {
  const { openMenuId, setOpenMenuId } = useMenu();
  const menuIdRef = useRef<string>(Math.random().toString(36).substring(2, 15));
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // setOpen(false);
        setOpenMenuId(null);
      }
    },
    [setOpenMenuId]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="flex justify-center items-center relative" ref={menuRef}>
      <button
        className="flex justify-center items-center hover:bg-slate-200 w-[40px] h-[40px] rounded-full"
        onClick={(ev) => {
          ev.stopPropagation();
          setOpenMenuId(
            openMenuId === menuIdRef.current ? null : menuIdRef.current
          );
        }}
      >
        {activator}
      </button>

      {openMenuId === menuIdRef.current && (
        <div
          key={menuIdRef.current}
          className="flex absolute border min-h-[20px] right-0 top-full bg-white shadow-xl"
          style={{ zIndex: +999, transform: "translateX(0%)" }}
          onClick={(ev) => ev.stopPropagation()}
        >
          {menu}
        </div>
      )}
    </div>
  );
}


export default ActionMenu;
