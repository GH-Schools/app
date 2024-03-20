import React from "react";

type CustomSelectProps = {
  options: {
    name: string;
    value: string;
    selected?: boolean;
    uniqueId?: any;
  }[];
};
function CustomSelect({ options }: CustomSelectProps) {
  return (
    <select>
      {options.map((option, index) => (
        <option
          key={option.uniqueId || index}
          value={option.value}
          selected={option.selected}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default CustomSelect;
