import React from "react";
import { Outlet } from "react-router-dom";

import { DashboardPanel } from "../features/dashboard/components/DashboardPanel";
import { DashboardMenu } from "../features/dashboard/components/DashboardMenu";

export default function MainLayout() {
  return (
    <div className="container mx-auto grid grid-cols-12 h-screen overflow-y-hidden">
      <div className="col-span-4 bg-red-50 px-1.5">{DashboardPanel()}</div>
      <div className="col-span-8 h-full flex flex-col gap-y-1.5 pb-1.5 bg-purple-400">
        <div className="bg-red-300 flex-shrink">{DashboardMenu()}</div>
        <div className="w-[98%] h-full place-self-center shadow-secondary-content shadow-sm rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
