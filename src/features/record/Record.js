import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";

import { setSelectedRecord } from "./recordSlice";
import { selectRecords, selectRecordsStatus } from "../records/recordsSlice";

export function Record() {
  const dispatch = useDispatch();
  const params = useParams();

  var [query, setQuery] = useSearchParams();

  const records = useSelector(selectRecords);
  const recordsStatus = useSelector(selectRecordsStatus);

  const recordID = query.toString().replace("id=", "");
  const selectedRecord = records[0];

  useEffect(() => {
    dispatch(setSelectedRecord(selectedRecord));
  }, [recordsStatus === "success"]);

  return (
    <div>
      {records.map((record) => {
        if (record.id == recordID) {
          return (
            <div>
              <div>{record.title}</div>
              <div>{record.order}</div>
              <div>{record.priority}</div>
              <div>{record.status}</div>
            </div>
          );
        }
        return;
      })}
    </div>
  );
}
