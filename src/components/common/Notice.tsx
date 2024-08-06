import React from "react";
import { BsExclamationCircle, BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";
import { GenericObject } from "../../interfaces";
import { mergeClassNames } from "../../utils/utilities";

interface NoticeProps {
  title?: string;
  message: string | JSX.Element;
  variant?: "warn" | "success" | "error";
  className?: string;
  style?: GenericObject;
  titleStyle?: GenericObject;
  indicatorIcon?: React.ReactNode | JSX.Element;
  children?: React.ReactNode;
}

export const theme = {
  success: {
    body: {
      backgroundColor: "#EBFFF7",
      border: "1px solid #DBEFE7",
    },
    title: {
      color: "#31B5A7",
    },
    message: { color: "#717171", fontWeight: 500, fontSize: "12px" },
    icon: (
      <BsCheckCircle style={{ color: "#31B5A7", fontSize: "14px" }} />
    ),
  },
  warn: {
    // "#e7a94b"
    body: {
      border: "1px solid #F5F3E3",
      backgroundColor: "#FDFBEB",
    },
    title: {
      color: "#e7a94b",
    },
    message: { color: "#717171", fontWeight: 500, fontSize: "12px" },
    icon: (
      <BsExclamationCircle style={{ color: "#e7a94b", fontSize: "14px" }} />
    ),
  },
  error: {
    body: {
      backgroundColor: "#FFEBED",
      border: "1px solid #FFDBDD",
    },
    title: {
      color: "#EF8B8D",
    },
    message: { color: "#717171", fontWeight: 500, fontSize: "12px" },
    icon: (
      <BsExclamationTriangle style={{ color: "#EF8B8D", fontSize: "14px" }} />
    ),
  },
};

function Notice({
  message,
  indicatorIcon,
  title = "Note:",
  variant = "warn",
  className = "",
  style = {},
  titleStyle = {},
  children,
}: NoticeProps) {
  return (
    <div
      className={mergeClassNames(
        "flex flex-col md:flex-row p-4 my-2 gap-2 w-full",
        className
      )}
      style={{
        borderRadius: "8px",
        ...theme[variant].body,
        ...style,
      }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3.5">
        <div className="flex flex-row items-center">
          {indicatorIcon ? indicatorIcon : theme[variant].icon}
          <span
            className="ml-2"
            style={{
              whiteSpace: "nowrap",
              fontSize: "12px",
              fontWeight: 700,
              ...theme[variant].title,
              ...titleStyle,
            }}
          >
            {title}
          </span>
        </div>

        <span style={{ ...theme[variant].message }}>{message}</span>
      </div>

      <div className="flex flex-row items-center mt-4 md:mt-0 ml-auto">
        {children}
      </div>
    </div>
  );
}

export default Notice;
