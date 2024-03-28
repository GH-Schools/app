import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer";
import Header from "../components/DashboardHeader";

function DashboardLayout() {
  return (
    <main className="flex flex-row h-screen w-screen min-h-[500px]">
      <Drawer/>
      <section className="backdrop w-full overflow-auto">
        <Header />
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardLayout;
