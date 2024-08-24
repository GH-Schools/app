import { MdClose } from "react-icons/md";

import { mergeClassNames } from "../../utils/utilities";

export enum DIRECTION {
  UP,
  DOWN,
  LEFTWARDS,
  RIGHTWARDS,
  CENTER,
}

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  direction?: DIRECTION;
  toggleHandler?: (ev: any) => void;
};

function Modal({
  open,
  children,
  toggleHandler,
  direction = DIRECTION.RIGHTWARDS,
}: ModalProps) {
  const directionClass = {
    [DIRECTION.UP]: {
      outer: mergeClassNames("top-0", !open ? "left-[100vw]" : "left-0"),
      inner: mergeClassNames("left-1/2", !open ? "top-[100vh]" : "top-1/2"),
    },
    [DIRECTION.DOWN]: {
      outer: mergeClassNames("top-0", !open ? "left-[100vw]" : "left-0"),
      inner: mergeClassNames("left-1/2", !open ? "top-[-100vh]" : "top-1/2"),
    },
    [DIRECTION.LEFTWARDS]: {
      outer: mergeClassNames("top-0", !open ? "left-[100vw]" : "left-0"),
      inner: mergeClassNames("top-1/2", !open ? "left-[100vw]" : "left-1/2"),
    },
    [DIRECTION.RIGHTWARDS]: {
      outer: mergeClassNames("top-0", !open ? "left-[-100vw]" : "left-0"),
      inner: mergeClassNames("top-1/2", !open ? "left-0" : "left-1/2"),
    },
    [DIRECTION.CENTER]: {
      outer: mergeClassNames("top-0", !open ? "left-[-100vw]" : "left-0"),
      inner: mergeClassNames(
        "top-1/2 left-1/2",
        !open ? "scale-x-0 scale-y-0" : "scale-x-1 scale-y-1"
      ),
    },
  };

  return (
    <div
      className={mergeClassNames(
        `flex flex-col justify-between items-start fixed w-[100%] p-4`,
        directionClass[direction].outer,
        `h-full min-h-screen shadow-md`
      )}
      style={{
        zIndex: "+99999",
        backgroundColor: "#0006",
      }}
    >
      <div
        className={mergeClassNames(
          `flex flex-col justify-between items-center relative min-w-[80vw] sm:min-w-[300px] min-h-md h-auto -translate-x-1/2 -translate-y-1/2 rounded-md`,
          directionClass[direction].inner,
          `px-4 pt-2 pb-4 overflow-auto transition-all delay-0 duration-[500ms] ease shadow-md`
        )}
        style={{
          zIndex: "+99999",
          color: "black",
          backgroundColor: "white",
        }}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex ml-auto justify-end p-2 rounded-full hover:bg-[#00000023]">
            {toggleHandler && (
              <button onClick={toggleHandler}>{<MdClose />}</button>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
