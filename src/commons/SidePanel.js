import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRecords,
  selectRecordsQueryStatus,
} from "../store/slices/records.slice";

import { getRecords } from "../store/actions/records.actions";
import { useNavigate } from "react-router-dom";

export function SidePanel({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const records = useSelector(selectRecords);
  const recordsQueryStatus = useSelector(selectRecordsQueryStatus);

  useEffect(() => {
    dispatch(getRecords({}));
  }, []);
  // useEffect(() => {
  //   dispatch(getRecords({}));
  //   if (recordsQueryStatus === "deleted") {
  //     dispatch(getRecords({}));
  //   }
  // }, [recordsQueryStatus]);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
