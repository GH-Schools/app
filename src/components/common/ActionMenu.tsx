import React, { EventHandler, useCallback, useEffect, useRef } from "react";
import useMenu from "../../hooks/useMenu";
import { mergeClassNames } from "../../utils/utilities";
// import { mergeClassNames } from "../../utils/utilities";

export enum PLACEMENT {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export enum EVENT_TYPES {
  CLICK = "onClick",
  HOVER = "onMouseOver",
  FOCUS = "onFocus",
  BLUR = "onBlur",
}

export type ActionMenuProps = {
  activator: React.ReactNode | JSX.Element;
  menu: React.ReactNode | JSX.Element;
  placement?: PLACEMENT;
  eventType?: EVENT_TYPES;
  eventHandler?: EventHandler<any> | Function;
  activatorClassName?: string;
  menuClassName?: string;
};

function ActionMenu({
  menu,
  activator,
  menuClassName = "",
  activatorClassName = "",
  eventHandler = () => {},
  eventType = EVENT_TYPES.HOVER,
  placement = PLACEMENT.BOTTOM,
}: ActionMenuProps) {
  const positionClass = {
    [PLACEMENT.TOP]: "left-1/2 -translate-x-1/2 bottom-[103%]",
    [PLACEMENT.RIGHT]: "left-full top-1/2 -translate-y-1/2",
    [PLACEMENT.BOTTOM]: "left-1/2 -translate-x-1/2 top-full",
    [PLACEMENT.LEFT]: "right-full top-1/2 -translate-y-1/2",
  };

  const activatorProps = {
    className: mergeClassNames(
      "flex justify-center items-center hover:bg-slate-200 w-[40px] h-[40px] rounded-full",
      activatorClassName
    ),
    [eventType]: eventHandler,
  };

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
    <div
      className="flex justify-center items-center relative"
      ref={menuRef}
    >
      <button
        {...activatorProps}
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
          className={mergeClassNames(
            `flex absolute min-h-[20px] bg-white shadow-xl`,
            menuClassName,
            positionClass[placement]
          )}
          style={{ zIndex: +999 }}
          onClick={(ev) => ev.stopPropagation()}
        >
          {menu}
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
