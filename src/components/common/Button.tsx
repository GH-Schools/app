import React from "react";
import { mergeClassNames } from "../../utils/utilities";

type ButtonProps = {
  text: string | React.ReactNode;
  type?: "submit" | "reset" | "button";
  href?: string;
  className?: string;
  style?: { [x: string]: any };
  onClick?: React.EventHandler<any>;
};

const Button = ({
  text,
  href,
  style = {},
  className = "rounded-md text-black bg-white",
  ...props
}: ButtonProps) => {
  return !href ? (
    <button
      className={mergeClassNames(
        "inline-flex justify-center items-center text-black bg-white",
        className
      )}
      style={{
        textTransform: "uppercase",
        padding: "12px 24px",
        letterSpacing: "1px",
        fontWeight: 500,
        textAlign: "center",
        ...style,
      }}
      {...props}
    >
      {text}
    </button>
  ) : (
    <a
      href={href}
      className={mergeClassNames(
        "inline-flex justify-center items-center text-black bg-white",
        className
      )}
      style={{
        textAlign: "center",
        textTransform: "uppercase",
        padding: "12px 24px",
        letterSpacing: "1px",
        fontWeight: 500,
        ...style,
      }}
      {...props}
    >
      {text}
    </a>
  );
};

export default Button;
