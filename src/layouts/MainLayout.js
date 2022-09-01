import React from "react";
import { Outlet, Link } from "react-router-dom";

import { TopBar } from "../commons/TopBar";
import { SidePanel } from "../commons/SidePanel";

import { UserTopBar } from "../features/user/UserTopBar";
import { SearchBar } from "../commons/SearchBar";
import { Records } from "../features/records/Records";

export default function MainLayout() {
  function CreateRecordButton() {
    return (
      <Link
        to="new-record"
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-block"
      >
        Crear Expediente
      </Link>
    );
  }
  return (
    <div className="container mx-auto grid grid-cols-12 h-screen overflow-y-hidden">
      {/* Panel lateral del dashboard */}
      <div className="col-span-4 px-1.5">
        <SidePanel>
          <UserTopBar />
          <SearchBar />
          {CreateRecordButton()}
          <Records />
        </SidePanel>
      </div>
      {/* Área Dashboard con menu y contenido */}
      <div className="col-span-8 h-full flex flex-col gap-y-1.5 pb-1.5">
        <div className="flex-shrink">
          <TopBar />
        </div>
        <div className="w-[98%] h-full place-self-center shadow-secondary-content shadow-sm rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
