import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setRecordsQueryStatus,
  selectRecordsQueryStatus,
} from "../store/slices/records.slice";

import { getRecords } from "../store/actions/records.actions";

export function SidePanel({ children }) {
  const dispatch = useDispatch();

  const recordsQueryStatus = useSelector(selectRecordsQueryStatus);

  useEffect(() => {
    dispatch(getRecords({}));
  }, [dispatch]);
  useEffect(() => {
    if (recordsQueryStatus === "success") {
      dispatch(setRecordsQueryStatus(""));
    }
  }, [recordsQueryStatus]);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
