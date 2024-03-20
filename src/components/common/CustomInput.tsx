import React from "react";

type InputProps = {
  placeholder: string;
};

function CustomInput({ placeholder }: InputProps) {
  return <input placeholder={placeholder} />;
}

export default CustomInput;
