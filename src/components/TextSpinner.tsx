import React from "react";
import Spinner from "./Spinner";

type TextSpinnerProps = { loading: boolean; text: string };

function TextSpinner({ loading, text }: TextSpinnerProps) {
  return loading ? (
    <Spinner size={20} color="secondary" />
  ) : (
    <span>{text}</span>
  );
}

export default TextSpinner;
