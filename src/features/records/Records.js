import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { generateKey } from "../../utils/generateKey";

import {
  getRecords,
  selectRecords,
  selectRecordsStatus,
  setRecordsStatus,
} from "./recordsSlice";
import { selectRecord } from "../record/recordSlice";

export function Records() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const records = useSelector(selectRecords);
  const record = useSelector(selectRecord);
  const recordsStatus = useSelector(selectRecordsStatus);
  const recordStatus = useSelector(selectRecordsStatus);

  const goToRecord = (value) => {
    navigate({
      pathname: "/record",
      search: `?id=${value}`,
    });
  };

  useEffect(() => {
    if (recordStatus === "created") {
      navigate({
        pathname: "/record",
        search: `?id=${record.id}`,
      });
      dispatch(getRecords({}));
    }
  }, [recordStatus]);

  useEffect(() => {
    if (recordsStatus !== "loading") {
      dispatch(setRecordsStatus({ status: "" }));
    }
  }, [recordsStatus]);

  return (
    <ul className="menu bg-base-100 w-[97%] self-center rounded-box">
      <li className="bordered">
        {recordStatus === "loading"
          ? "Loading..."
          : records.map((record) => {
              return (
                <button
                  key={generateKey(record.id)}
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
