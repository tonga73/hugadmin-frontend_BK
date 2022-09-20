import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setRecordsStatus,
  selectRecordsStatus,
} from "../store/slices/records.slice";

import { getRecords } from "../store/actions/records.actions";

export function SidePanel({ children }) {
  const dispatch = useDispatch();

  const recordsStatus = useSelector(selectRecordsStatus);

  useEffect(() => {
    dispatch(getRecords({}));
  }, [dispatch]);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
