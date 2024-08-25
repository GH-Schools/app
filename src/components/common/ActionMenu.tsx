import React, {
  EventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useMenu from "../../hooks/useMenu";
import { mergeClassNames } from "../../utils/utilities";
// import { mergeClassNames } from "../../utils/utilities";

export enum PLACEMENT {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
  AUTO,
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
  edgeOffset?: number;
};

function ActionMenu({
  menu,
  activator,
  edgeOffset = 0,
  menuClassName = "",
  activatorClassName = "",
  eventHandler = () => {},
  eventType = EVENT_TYPES.HOVER,
  placement = PLACEMENT.AUTO,
}: ActionMenuProps) {
  const [autoClass, setAutoClass] = useState("");
  const [autoStyle, setAutoStyle] = useState({});
  const positionClass = useMemo(
    () => ({
      [PLACEMENT.TOP]: "left-1/2 -translate-x-1/2 bottom-[103%]",
      [PLACEMENT.RIGHT]: "left-[102%] top-1/2 -translate-y-1/2",
      [PLACEMENT.BOTTOM]: "left-1/2 -translate-x-1/2 top-full",
      [PLACEMENT.LEFT]: "right-[102%] top-1/2 -translate-y-1/2",
      [PLACEMENT.AUTO]: autoClass,
    }),
    [autoClass]
  );

  const activatorProps = {
    className: mergeClassNames(
      "flex justify-center items-center w-[40px] h-[40px] rounded-full",
      activatorClassName
    ),
    [eventType]: eventHandler,
  };

  const { openMenuId, setOpenMenuId } = useMenu();
  const menuIdRef = useRef<string>(Math.random().toString(36).substring(2, 15));
  const menuRef = useRef<HTMLDivElement>(null);
  const popMenuRef = useRef<HTMLDivElement>(null);

  const chooseBestPosition = useCallback(
    (target: any) => {
      const root = getClosestRelativeParent(popMenuRef.current!);
      const viewportWidth = window.innerWidth - edgeOffset;
      const viewportTop = root.getBoundingClientRect().top;
      // const viewportHeight = window.innerHeight;
      const menuWidth =
        popMenuRef.current?.getBoundingClientRect().width || 150;
      const menuHeight =
        popMenuRef.current?.getBoundingClientRect().height || 150;

      const activatorSize = target.target?.getBoundingClientRect();
      const activatorEdgesPosition = {
        left: activatorSize.x,
        top: activatorSize.y,
        right: activatorSize.x + activatorSize.width,
        bottom: activatorSize.y + activatorSize.height,
      };

      console.log({
        popMenuRef,
        activatorSize,
        menuWidth,
        menuHeight,
        viewportWidth,
        menuX: activatorEdgesPosition.right + menuWidth,
        menuHalfX: activatorEdgesPosition.right + Math.ceil(menuWidth / 2),
        x: activatorEdgesPosition.right + menuWidth,
        y: activatorEdgesPosition.right + Math.ceil(menuWidth / 2),
      });

      const validXPositions = [
        {
          title: "Right edge",
          index: 0,
          pos: activatorEdgesPosition.right - root.getBoundingClientRect().left,
          condition: activatorEdgesPosition.right + menuWidth < viewportWidth,
        },
        {
          title: "Left edge",
          index: 1,
          pos: activatorEdgesPosition.left - root.getBoundingClientRect().left,
          condition: activatorEdgesPosition.left + menuWidth < viewportWidth,
        },
        {
          title: "Align in the Middle",
          index: 2,
          pos:
            activatorEdgesPosition.left +
            Math.floor(activatorSize.width / 2) -
            Math.floor(menuWidth / 2) -
            root.getBoundingClientRect().left,
          condition:
            activatorEdgesPosition.left +
              Math.floor(activatorSize.width / 2) -
              Math.floor(menuWidth / 2) +
              menuWidth <
            viewportWidth,
        },
        {
          title: "- Right edge",
          index: 3,
          pos:
            activatorEdgesPosition.right -
            menuWidth -
            root.getBoundingClientRect().left,
          condition: activatorEdgesPosition.right - menuWidth < viewportWidth,
        },
        {
          title: "- Left edge",
          index: 4,
          pos:
            activatorEdgesPosition.left -
            menuWidth -
            root.getBoundingClientRect().left,
          condition: activatorEdgesPosition.left - menuWidth < viewportWidth,
        },
      ];

      const validYPositions = [
        {
          title: "- Top edge",
          index: 0,
          pos:
            activatorEdgesPosition.top -
            menuHeight -
            root.getBoundingClientRect().top,
          condition: activatorEdgesPosition.top - menuHeight > viewportTop,
        },
        {
          title: "- Bottom edge",
          index: 1,
          pos:
            activatorEdgesPosition.bottom -
            menuHeight -
            root.getBoundingClientRect().top,
          condition: activatorEdgesPosition.bottom - menuHeight > viewportTop,
        },
        {
          title: "Align in the Middle",
          index: 2,
          pos:
            activatorEdgesPosition.top +
            Math.floor(activatorSize.height / 2) -
            Math.floor(menuHeight / 2) -
            root.getBoundingClientRect().top,
          condition:
            activatorEdgesPosition.top +
              Math.floor(activatorSize.height / 2) -
              Math.floor(menuHeight / 2) >
            viewportTop,
        },
        {
          title: "Top edge",
          index: 3,
          pos: activatorEdgesPosition.top - root.getBoundingClientRect().top,
          condition: activatorEdgesPosition.top > viewportTop,
        },
        {
          title: "Bottom edge",
          index: 4,
          pos: activatorEdgesPosition.bottom - root.getBoundingClientRect().top,
          condition: activatorEdgesPosition.bottom > viewportTop,
        },
      ];

      const validCombo = [
        [0, 1],
        [0, 3],
        [0, 2],
        [1, 0],
        [1, 4],
        [2, 0],
        [2, 4],
        [3, 0],
        [3, 4],
        [4, 1],
        [4, 3],
        [4, 2],
      ];

      const bestPositionCombo = validCombo.find((combo) => {
        const [inX, inY] = combo;
        return validXPositions[inX].condition && validXPositions[inY].condition;
      });

      const bestXPos = validXPositions[bestPositionCombo?.[0] ?? 0];
      const bestYPos = validYPositions[bestPositionCombo?.[1] ?? 0];

      setAutoClass(
        `left-[${Math.round(bestXPos.pos)}px] top-[${Math.round(
          bestYPos.pos
        )}px]`
      );

      setAutoStyle({
        left: `${Math.round(bestXPos.pos)}px`,
        top: `${Math.round(bestYPos.pos)}px`,
      });

      // console.log({
      //   positionClass,
      //   validXPositions,
      //   validYPositions,
      //   validCombo,
      //   bestPositionCombo,
      //   bestPositionComboString: [
      //     `X - ${bestXPos.title} at ${bestXPos.pos}`,
      //     `Y - ${bestYPos.title} at ${bestYPos.pos}`,
      //   ],
      // });
    },
    [edgeOffset]
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();

      setOpenMenuId(
        openMenuId === menuIdRef.current ? null : menuIdRef.current
      );

      const a = setTimeout(() => {
        chooseBestPosition(event);
        clearTimeout(a);
      }, 100);
    },
    [chooseBestPosition, openMenuId, setOpenMenuId]
  );

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
      <button {...activatorProps} onClick={handleClick}>
        {activator}
      </button>

      {openMenuId === menuIdRef.current && (
        <div
          ref={popMenuRef}
          key={menuIdRef.current}
          className={mergeClassNames(
            `pop flex absolute min-h-[20px] bg-white shadow-xl transition duration-600 ease`,
            menuClassName,
            placement === PLACEMENT.AUTO ? autoClass : positionClass[placement]
          )}
          style={{ zIndex: +999, ...autoStyle }}
          onClick={(ev) => ev.stopPropagation()}
        >
          {menu}
        </div>
      )}
    </div>
  );
}

const getClosestRelativeParent = (child: HTMLElement): HTMLElement => {
  const parentElement = child.parentElement;
  // console.log(parentElement);
  if (parentElement === null) return child;

  const positionType = getComputedStyle(parentElement).position;
  // console.log(positionType);

  if (positionType === "relative") {
    return parentElement;
  }

  return getClosestRelativeParent(parentElement);
};

export default ActionMenu;
