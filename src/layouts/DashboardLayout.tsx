import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer";
import Header from "../components/DashboardHeader";

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  console.log(open);

  return (
    <main className="flex flex-row h-screen w-screen min-h-[500px]">
      <Drawer open={open} toggleHandler={(state) => () => setOpen(state)} />
      <section className="backdrop w-full overflow-auto">
        <Header toggleHandler={(state) => () => setOpen(state)} />
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardLayout;
