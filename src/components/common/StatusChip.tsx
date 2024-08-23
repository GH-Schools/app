import React from "react";

type StatusProps = {
  value: React.ReactNode | JSX.Element;
  type: "pending" | "success" | "error" | "info" | "neutral";
  roundness?: string | number;
  width?: string;
  sx?: any;
};

function StatusChip(props: StatusProps) {
  const { value, type = "pending", roundness = "13px", width, sx } = props;

  const wrapperStyle = {
    width: width ?? "auto",
    height: "26px",
    padding: "8px",
    borderRadius: roundness,
    borderColor: "#F5222D",
    backgroundColor: "#FFF1F0",
    borderWidth: "0.6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...sx,
  };

  const textStyle = {
    fontSize: "12px",
    fontWeight: 600,
    display: "block",
    color: "#F5222D",
  };

  switch (type) {
    case "success":
      // Green
      wrapperStyle.backgroundColor = "#D4F7DC";
      wrapperStyle.borderColor = "#D4F7DC";
      textStyle.color = "#15692A";
      break;

    case "pending":
      // Orange
      wrapperStyle.backgroundColor = "#FFF7E6";
      wrapperStyle.borderColor = "#FFF7E6";
      textStyle.color = "#FA8C16";
      break;

    case "error":
      // Red
      wrapperStyle.backgroundColor = "#FFD4D2";
      wrapperStyle.borderColor = "#FFD4D2";
      textStyle.color = "#9F1F17";
      break;

    case "info":
      // blue
      wrapperStyle.backgroundColor = "#DBF5FF";
      wrapperStyle.borderColor = "#DBF5FF";
      textStyle.color = "#1E0A3C";
      break;

    case "neutral":
      // gray
      wrapperStyle.backgroundColor = "#E5E5EA";
      wrapperStyle.borderColor = "#E5E5EA";
      textStyle.color = "#1E0A3C";
      break;

    default:
      wrapperStyle.backgroundColor = "#FFF1F0";
      wrapperStyle.borderColor = "#F5222D";
      textStyle.color = "#F5222D";
      break;
  }
  return (
    <div style={wrapperStyle}>
      <span style={textStyle}>{value}</span>
    </div>
  );
}

export default StatusChip;
