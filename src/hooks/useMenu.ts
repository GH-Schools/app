import { useContext } from "react";
import { MenuContext } from "../contexts";

// Custom hook to use the MenuContext
export default function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
