import { createContext, useState } from "react";

// Context to share the currently open menu across all ActionMenu instances
export const MenuContext = createContext<{
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
} | null>(null);

// MenuProvider component to wrap the app
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <MenuContext.Provider value={{ openMenuId, setOpenMenuId }}>
      {children}
    </MenuContext.Provider>
  );
}