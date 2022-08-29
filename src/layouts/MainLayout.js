import React from "react";
import { Outlet } from "react-router-dom";

import { DashboardPanel } from "../features/dashboard/components/DashboardPanel";
import { DashboardMenu } from "../features/dashboard/components/DashboardMenu";

export default function MainLayout() {
  return (
    <div className="container mx-auto grid grid-cols-12 h-screen overflow-y-hidden">
      <div className="col-span-4">{DashboardPanel()}</div>
      <div className="col-span-8 h-full grid grid-flow-row">
        {DashboardMenu()}
        <div className="w-[98%] h-[36rem] place-self-center  shadow-secondary-content shadow-sm rounded-md py-1.5 px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
