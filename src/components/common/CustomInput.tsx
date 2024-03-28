import React from "react";

type InputProps = {
  sx?: {
    width?: string;
    [x: string]: any;
  };
  placeholder?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

function CustomInput({
  placeholder = "Enter text here",
  startAdornment,
  endAdornment,
  sx = {},
}: InputProps) {
  return (
    <div className="flex items-stretch justify-between bg-slate-100 rounded-3xl gap-1 overflow-hidden px-3">
      <div className="flex items-center text-xl">{startAdornment}</div>

      <input
        className="bg-transparent text-sm px-2 py-2.5 outline-none"
        placeholder={placeholder}
      />

      <div className="flex items-center text-xl">{endAdornment}</div>
    </div>
  );
}

export default CustomInput;
