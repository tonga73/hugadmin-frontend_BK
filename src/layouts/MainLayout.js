import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Outlet, Link } from "react-router-dom";
import { gapi } from "gapi-script";

import { TopBar } from "../commons/TopBar";
import { SidePanel } from "../commons/SidePanel";

import { UserTopBar } from "../features/user/UserTopBar";
import { SearchBar } from "../commons/SearchBar";
import { Records } from "../features/records/Records";

import { setSignedIn, selectIsSignedIn } from "../store/slices/users.slice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const auth = useRef(null);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const isSignedIn = useSelector(selectIsSignedIn);
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: clientId,
          scope: "profile email",
        })
        .then(() => {
          auth.current = gapi.auth2.getAuthInstance();
          dispatch(
            setSignedIn({
              queryStatus: "",
              isSignedIn: auth.current.isSignedIn.get(),
            })
          );
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, [isSignedIn]);

  const onAuthChange = () => {
    dispatch(
      setSignedIn({
        queryStatus:
          auth.current.isSignedIn.get() === false ? "logedout" : "logedin",
        isSignedIn: auth.current.isSignedIn.get(),
      })
    );
  };
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
          {CreateRecordButton()}
          <SearchBar />
          <Records />
        </SidePanel>
      </div>
      {/* Área Dashboard con menu y contenido */}
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
}
