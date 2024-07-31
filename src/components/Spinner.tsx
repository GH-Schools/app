import React from "react";

type SpinnerProps = {
  size?: number | string;
  color?: string;
  thickness?: string;
};

export default function Spinner(props: SpinnerProps) {
  const { color = "text-blue-500", thickness = "border-t-2 border-r-2" } = props;
  let { size = "h-10 w-10" } = props;

  const style: { width?: string } = {};

  if (size && typeof size === "number") {
    size = `h-[${size}px] w-[${size}px]`;
    style.width = `${size}px`;
  }

  return (
    <div className={`flex justify-center items-center ${size}`} >
      <div
        className={`animate-spin rounded-full ${thickness} ${color} h-[20px] w-[20px]` }
        style={style}
      />
    </div>
  );
}
