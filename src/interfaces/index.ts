export type ActionErrorType = Error | {};

export type GenericObject = { [x: string]: any };

export type InputProps = {
  placeholder?: string;
  label?: string;
  sx?: any;
  inputSx?: any;
  width?: any;
  name: string;
  value?: string;
  min?: number;
  max?: number;
  type?: string;
  disabled?: boolean;
  onChange?: (e?: any) => void;
  onBlur?: (e?: any) => void;
  touched?: any;
  errors?: any;
  required?: boolean;
  validate?: (value: string) => string | null | undefined;
};

export interface SelectProps {
  name: string;
  label: string;
  width: any;
  height?: any;
  sx?: any;
  multiple?: boolean | any;
  value?: string | string[];
  onBlur?: (e?: any) => void;
  touched?: any;
  errors?: any;
  required?: boolean;
}
