import { MdClose } from "react-icons/md";

import { mergeClassNames } from "../../utils/utilities";

type ModalProps = {
  open: boolean;
  toggleHandler?: (ev: any) => void;
  children: React.ReactNode;
};

function Modal({ open, toggleHandler, children }: ModalProps) {
  return (
    <div
      className={mergeClassNames(
        `flex flex-col justify-between items-start fixed top-0 w-[100%] p-4`,
        !open ? "left-[-100vw]" : "left-0",
        `h-full min-h-screen shadow-md`
      )}
      style={{
        zIndex: "+99999",
        backgroundColor: "#0006",
      }}
    >
      <div
        className={mergeClassNames(
          `flex flex-col justify-between items-center relative min-w-[80vw] sm:min-w-[300px] min-h-md h-auto top-1/2 left-1/2 rounded-md`,
          !open ? "left-[-100vw]" : "left-0",
          `px-4 pt-2 pb-4 overflow-auto transition-all delay-0 duration-600 ease-in-out shadow-md`
        )}
        style={{
          transform: "translate(-50%, -50%)",
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
