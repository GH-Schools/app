import React from "react";

type TextIconProps = {
  icon: React.ReactNode | JSX.Element;
  text: React.ReactNode | JSX.Element;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};
function TextIcon({ icon, text, size }: TextIconProps) {
  return (
    <>
      <span className={`hidden ${size}:inline-block`}>{text}</span>
      <span className={`${size}:hidden inline-block`}>{icon}</span>
    </>
  );
}

export default TextIcon;
