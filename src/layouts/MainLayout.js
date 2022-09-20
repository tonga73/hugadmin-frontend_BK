import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { Button } from "react-daisyui";

import { TopBar } from "../commons/TopBar";
import { SidePanel } from "../commons/SidePanel";

import UserTopBar from "../features/user/UserTopBar";
import { SearchBar } from "../commons/SearchBar";
import Records from "../features/records/Records";

export default () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto grid grid-cols-12 h-screen overflow-y-hidden">
      {/* Panel lateral del dashboard */}
      <div className="col-span-4 px-1.5">
        <SidePanel>
          <UserTopBar />
          <Button onClick={() => navigate("/new-record")} size="lg">
            Crear Expediente
          </Button>
          <SearchBar />
          <Records />
        </SidePanel>
      </div>
      {/* Área menu y contenido Dashboard */}
      <div className="col-span-8 h-full flex flex-col gap-y-1.5 pb-1.5">
        <div className="flex-shrink">
          <TopBar />
        </div>
        <div className="w-[98%] h-full p-1.5 place-self-center shadow-primary-content shadow-sm rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
