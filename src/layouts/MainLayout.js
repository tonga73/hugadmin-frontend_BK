import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Button } from "react-daisyui";

import { TopBar } from "../commons/TopBar";
import { SidePanel } from "../commons/SidePanel";

import UserTopBar from "../features/user/UserTopBar";
import { SearchBar } from "../commons/SearchBar";
import Records from "../features/records/Records";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="container mx-auto grid grid-cols-12 h-screen overflow-y-hidden bg-base-300">
      {/* Panel lateral del dashboard */}
      <div className="col-span-4 px-1.5 max-h-screen overflow-y-auto overflow-hidden">
        <SidePanel>
          <UserTopBar />
          <Button
            onClick={() => navigate("/new-record")}
            size="lg"
            disabled={location === "/new-record"}
          >
            Crear Expediente
          </Button>
          <div className="flex flex-col gap-y-1.5 sticky top-3 z-10">
            <SearchBar />
          </div>
          <Records />
        </SidePanel>
      </div>
      {/* Área menu y contenido Dashboard */}
      <div className="col-span-8 h-full flex flex-col gap-y-1.5 pb-1.5">
        <div className="flex-shrink">
          <TopBar />
        </div>
        <div className="w-[98%] h-full bg-base-200 p-1.5 place-self-center shadow-primary-content shadow-sm rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
