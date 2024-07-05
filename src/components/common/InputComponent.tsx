// import { useField } from "formik";
import React from "react";

import { InputProps } from "../../interfaces";

const InputComponent: React.FC<InputProps> = ({
  name,
  width,
  label,
  sx = {},
  errors = {},
  inputSx = {},
  touched = {},
  required = false,
  ...rest
}) => {
  // const [field, meta] = useField(name);
  // console.log(field, meta);

  return (
    <div style={{ width, ...sx }}>
      <span
        style={{
          width: "auto",
          fontSize: "12px",
          fontWeight: 700,
          color: "#717783",
          marginBottom: "4px",
          textTransform: "capitalize",
        }}
      >
        {label}
        {required && <small className="text-red-500 ml-1">*</small>}
      </span>
      <input
        name={name}
        style={{
          fontSize: "14px",
          padding: "12px 15px",
          width: "100%",
          borderRadius: "3px",
          backgroundColor: "#F4F8FA",
        }}
        // {...field}
        // InputProps={{
        //   sx: {
        //     height: "52px",
        //     border: "2px solid #E7E7ED",
        //     borderRadius: "3px",
        //     backgroundColor: "#F4F8FA",
        //     ...inputSx,
        //   },
        // }}
        // InputLabelProps={{
        //   style: {
        //     fontSize: "14px",
        //     fontWeight: 400,
        //     color: "#717783",
        //   },
        // }}
        {...rest}
      />
      {errors[name] && (touched[name] || true) && (
        <span className="error">{errors[name]}</span>
      )}
    </div>
  );
};

export default InputComponent;
