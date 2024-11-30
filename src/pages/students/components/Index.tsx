import {
  RiChat2Fill,
  RiAttachmentLine,
  RiCheckDoubleLine,
} from "react-icons/ri";
import { AiFillEdit, AiOutlineEdit } from "react-icons/ai";

import ActionMenu, {
  PLACEMENT,
  EVENT_TYPES,
} from "../../../components/common/ActionMenu";
// import Button from "../../../components/common/Button";
import TextSpinner from "../../../components/TextSpinner";
import AvatarImage from "../../../components/common/AvatarImage";

import { GenericObject } from "../../../interfaces";
import { mergeClassNames } from "../../../utils/utilities";

export const SectionIndicator: React.FC<{
  isComplete: boolean;
  isActive: boolean;
  isLoading: boolean;
  sectionNumber: number;
  activateFormHandler: (ev?: any) => void;
}> = ({
  isComplete,
  isActive,
  isLoading,
  sectionNumber,
  activateFormHandler,
}) => {
  return !isComplete ? (
    <div
      className={mergeClassNames(
        "flex items-center justify-center w-[35px] h-[35px] border-2 border-white rounded-full text-md font-bold text-white transition delay-200 ease-in duration-300",
        !isActive ? "bg-gray-600" : "ring ring-[#21B591] bg-[#21B591]"
      )}
    >
      {<TextSpinner loading={isLoading} text={`${sectionNumber}`} />}
    </div>
  ) : (
    <button
      onClick={activateFormHandler}
      className={mergeClassNames(
        "flex items-center justify-center border-2 gap-2 border-white text-md font-bold text-[#21B591] transition delay-200 ease-in duration-300"
      )}
    >
      <AiOutlineEdit />
      <span>Edit</span>
    </button>
  );
};

export const FieldComponent: React.FC<{
  width: string;
  label: string;
  value: React.ReactNode;
  sx: any;
}> = ({ width, label, sx = {}, value = "", ...rest }) => {
  return (
    <div className="flex flex-col" style={{ width, ...sx }}>
      <span
        style={{
          width: "auto",
          fontSize: "12px",
          fontWeight: 500,
          color: "#818793",
          marginBottom: "3px",
          textTransform: "capitalize",
        }}
      >
        {label}
      </span>
      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          padding: "10px 0px",
          borderRadius: "3px",
        }}
        {...rest}
      >
        {value}
      </div>
    </div>
  );
};

export const FloatMenu: React.FC<{ actions: GenericObject }> = ({
  actions,
}) => {
  const defaultButtonClass = `flex items-center justify-center p-2 rounded-full gap-2 text-md font-bold text-white transition duration-300 transition-ease-in hover:bg-[#ffffff58]`;

  return (
    <div
      className="fixed"
      style={{
        top: "calc(100vh - 80px - 4.125rem)",
        left: "calc(100vw - 80px - 4.125rem)",
      }}
    >
      <ActionMenu
        eventType={EVENT_TYPES.CLICK}
        placement={PLACEMENT.TOP}
        activator={"A"}
        activatorClassName={
          "flex flex-col items-center justify-center p-4 rounded-full bg-black w-[80px] h-[80px] shadow-xl text-white text-2xl transition duration-200 transition-ease-in hover:bg-[#2F2F2F]"
        }
        menu={
          <div className="flex flex-col items-center gap-3 p-4 rounded-md bg-black min-h-72 w-auto">
            <button
              onClick={actions.comment}
              className={mergeClassNames(defaultButtonClass)}
              title="Add Comment"
              disabled={false}
            >
              <RiChat2Fill fontSize={24} />
            </button>

            <button
              // onClick={activateFormHandler}
              className={mergeClassNames(defaultButtonClass)}
              title="Edit Form"
              disabled={false}
            >
              <AiFillEdit fontSize={24} />
            </button>

            <button
              onClick={actions.markAsInterviewed}
              className={mergeClassNames(defaultButtonClass)}
              title="Mark as complete"
              disabled={false}
            >
              <RiCheckDoubleLine fontSize={24} />
            </button>

            <button
              onClick={actions.attach}
              className={mergeClassNames(defaultButtonClass)}
            >
              <RiAttachmentLine fontSize={24} />
            </button>

            {/* <button
              // onClick={activateFormHandler}
              className={mergeClassNames(defaultButtonClass)}
            >
              <AiOutlineEdit fontSize={24} />
            </button> */}

            <div className="w-4/5 border mt-4 opacity-1/2"></div>
          </div>
        }
        menuClassName="fade-up"
        eventHandler={() => {}}
      />
    </div>
  );
};

export const Comment: React.FC<{
  userName: string;
  timestamp: number;
  message: string;
}> = ({ userName, timestamp, message }) => {
  return (
    <div className="flex items-stretch w-full gap-3">
      <AvatarImage alt={userName} />

      <div className="flex flex-col gap-2 flex-grow border-b pb-4">
        <div className="flex items-center gap-1">
          <b className="capitalize">{userName}</b>
          <span className="text-xs text-gray-600">*</span>
          <span className="text-xs text-gray-600">
            {`${new Date(timestamp).toDateString()}, ${new Date(timestamp).toLocaleTimeString()}`}
          </span>
        </div>

        <p className="text-sm text-gray-700">{message}</p>

        {/* <Button
            style={styles.headerBtn}
            text={
              <span className={`inline-block`}>
                <RiChat2Fill fontSize={24} />
              </span>
            }
          /> */}
      </div>
    </div>
  );
};
