import React from "react";

type InputProps = {
  sx?: {
    width?: string;
    [x: string]: any;
  };
  inputSx?: {
    [x: string]: any;
  };
  value?: string;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: (ev?: any) => void;
};

function CustomInput({
  placeholder = "Enter text here",
  startAdornment,
  endAdornment,
  sx = {},
  inputSx = {},
  ...rest
}: InputProps) {
  return (
    <div
      className="flex items-stretch justify-between bg-slate-100 rounded-3xl gap-1 overflow-hidden px-3"
      style={{ ...sx }}
    >
      <div className="flex items-center text-xl">{startAdornment}</div>

      <input
        className="bg-transparent text-sm px-2 py-2.5 outline-none text-inherit"
        placeholder={placeholder}
        style={{ ...inputSx }}
        {...rest}
      />

      <div className="flex items-center text-xl">{endAdornment}</div>
    </div>
  );
}

export default CustomInput;
