import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getRecords } from "../features/records/recordsSlice";

export function SidePanel({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecords({}));
  }, []);

  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
