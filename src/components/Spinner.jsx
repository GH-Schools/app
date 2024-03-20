import React from "react";

export default function Spinner(props) {
  const {
    size = "h-6 w-6",
    color = "text-blue-500",
    thickness = "border-2",
  } = props;
  
  return (
    <div className={`inline-block ${size}`}>
      <div className={`animate-spin rounded-full ${thickness} ${color}`} />
    </div>
  );
}
