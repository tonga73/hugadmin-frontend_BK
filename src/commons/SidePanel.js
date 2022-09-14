import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecords, selectRecords } from "../features/records/recordsSlice";

export function SidePanel({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  const records = useSelector(selectRecords);
  useEffect(() => {
    dispatch(getRecords({}));
  }, []);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
