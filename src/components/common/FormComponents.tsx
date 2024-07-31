// import { useField } from "formik";
import React from "react";

import {
  GenericObject,
  InputProps,
  SelectProps,
  FileUploadInputProps,
} from "../../interfaces";

export const InputComponent: React.FC<InputProps> = ({
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
  return (
    <div style={{ width, ...sx }}>
      <label
        htmlFor={name}
        style={{
          width: "auto",
          fontSize: "12px",
          fontWeight: 700,
          color: "#717783",
          marginBottom: "6px",
          textTransform: "capitalize",
        }}
      >
        {label}
        {required && <small className="text-red-500 ml-1">*</small>}
      </label>
      <input
        id={name}
        name={name}
        style={{
          fontSize: "14px",
          padding: "14px 14px",
          width: "100%",
          borderRadius: "3px",
          backgroundColor: "#F4F8FA",
        }}
        {...rest}
      />
      {errors[name] && (touched[name] || true) && (
        <span className="error">{errors[name]}</span>
      )}
    </div>
  );
};

export const SelectComponent: React.FC<
  SelectProps & { selectSx?: GenericObject }
> = ({
  name,
  width,
  label,
  sx = {},
  errors = {},
  touched = {},
  selectSx = {},
  required = false,
  options,
  ...rest
}) => {
  return (
    <div style={{ width, ...sx }}>
      <label
        htmlFor={name}
        style={{
          width: "auto",
          fontSize: "12px",
          fontWeight: 700,
          color: "#717783",
          marginBottom: "6px",
          textTransform: "capitalize",
        }}
      >
        {label}
        {required && <small className="text-red-500 ml-1">*</small>}
      </label>
      <select
        id={name}
        name={name}
        style={{
          fontSize: "14px",
          padding: "14px 14px",
          width: "100%",
          borderRadius: "3px",
          backgroundColor: "#F4F8FA",
        }}
        {...rest}
      >
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option.value}
              selected={option.selected || false}
            >
              {option.name}
            </option>
          );
        })}
      </select>
      {errors[name] && (touched[name] || true) && (
        <span className="error">{errors[name]}</span>
      )}
    </div>
  );
};

export const FileUploadComponent: React.FC<FileUploadInputProps> = ({
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
  const fr = new FileReader();

  fr.onload = () => {

  }
  // fr.readAsDataURL();

  
  return (
    <div className="border p-1.5 relative" style={{ width, ...sx }}>
      <label
        className="flex items-center justify-center text-center"
        htmlFor={name}
        style={{
          width: "150px",
          height: "150px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#9197a3",
          textTransform: "capitalize",
          backgroundColor: "#F4F8FA",
          padding: "14px 14px",
          cursor: "pointer",
          ...inputSx
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        style={{
          fontSize: "14px",
          width: "0.1px",
          height: "0.1px",
          position: "absolute",
          zIndex: -1,
          borderRadius: "3px",
        }}
        {...rest}
        type={"file"}
      />
      {errors[name] && (touched[name] || true) && (
        <span className="error">{errors[name]}</span>
      )}
    </div>
  );
};
