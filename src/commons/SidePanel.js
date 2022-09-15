import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getRecords } from "../store/actions/records.actions";

export function SidePanel({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecords({}));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(getRecords({}));
  //   if (recordsQueryStatus === "deleted") {
  //     dispatch(getRecords({}));
  //   }
  // }, [recordsQueryStatus]);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
