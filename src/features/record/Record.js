import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";

import { selectRecords, setSelectedRecord } from "./recordSlice";

export function Record() {
  const dispatch = useDispatch();
  const params = useParams();

  var [query, setQuery] = useSearchParams();

  const records = useSelector(selectRecords);

  const recordID = query.toString().replace("id=", "");

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
