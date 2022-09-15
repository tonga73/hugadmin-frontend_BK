import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRecords } from "../store/slices/records.slice";

import { getRecords } from "../store/actions/records.actions";

export function SidePanel({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  const records = useSelector(selectRecords);
  useEffect(() => {
    dispatch(getRecords({}));
  }, []);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
