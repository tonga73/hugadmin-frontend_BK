import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getRecords,
  selectRecords,
  selectFilteredRecords,
  selectRecordsQueryStatus,
  setRecordsQueryStatus,
} from "./recordsSlice";
import {
  selectRecord,
  selectRecordQueryStatus,
  setRecord,
} from "../record/recordSlice";

export function Records() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const records = useSelector(selectFilteredRecords);
  const record = useSelector(selectRecord);
  const recordsQueryStatus = useSelector(selectRecordsQueryStatus);
  const recordQueryStatus = useSelector(selectRecordQueryStatus);

  const goToRecord = (value) => {
    navigate(`record/${value}`);
  };

  useEffect(() => {
    if (recordQueryStatus === "created") {
      navigate({
        pathname: "/record",
        search: `?id=${record.id}`,
      });
      dispatch(getRecords({}));
    }
  }, [recordQueryStatus]);

  useEffect(() => {
    if (recordsQueryStatus !== "loading") {
      dispatch(setRecordsQueryStatus({ queryStatus: "" }));
    }
  }, [recordsQueryStatus]);

  return (
    <ul className="menu bg-base-100 w-[97%] self-center rounded-box">
      <li className="bordered">
        {recordQueryStatus === "loading"
          ? "Loading..."
          : records.map((record,index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    goToRecord(record.id);
                  }}
                >
                  {record.order} | {`${record.title.substring(0, 30)} ...`}
                </button>
              );
            })}
      </li>
    </ul>
  );
}
