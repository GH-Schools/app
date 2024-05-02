import React, { EventHandler } from "react";
import { mergeClassNames } from "../../utils/utilities";

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

export type DropMenuProps = {
  menuElement?: React.ReactNode | JSX.Element;
  activatorElement?: React.ReactNode | JSX.Element;
  placement?: PLACEMENT;
  eventType?: EVENT_TYPES;
  eventHandler?: EventHandler<any> | Function
};

function DropMenu({
  activatorElement,
  menuElement,
  eventHandler = () => { alert("hey") },
  eventType = EVENT_TYPES.HOVER,
  placement = PLACEMENT.BOTTOM,
}: DropMenuProps) {
  const positionClass = {
    [PLACEMENT.TOP]: "left-1/2 -translate-x-1/2 bottom-full",
    [PLACEMENT.RIGHT]: "left-full top-1/2 -translate-y-1/2",
    [PLACEMENT.BOTTOM]: "left-1/2 -translate-x-1/2 top-full",
    [PLACEMENT.LEFT]: "right-full top-1/2 -translate-y-1/2",
  };

  const activatorProps = {
    [eventType]: eventHandler
  };

  return (
    <div className="relative p-0.5">
      <div {...activatorProps}>{activatorElement}</div>
      <div className={mergeClassNames(`absolute`, positionClass[placement])}>
        {menuElement}
      </div>
    </div>
  );
}

export default DropMenu;
