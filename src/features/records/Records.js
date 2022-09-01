import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { generateKey } from "../../utils/generateKey";

import { getRecords, selectRecords, selectRecordsStatus } from "./recordsSlice";
import { selectRecord } from "../record/recordSlice";

export function Records() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const records = useSelector(selectRecords);
  const record = useSelector(selectRecord);
  const recordStatus = useSelector(selectRecordsStatus);

  const goToRecord = (value) => {
    if (record.id === value) {
      navigate("");
    } else {
      navigate({
        pathname: "/record",
        search: `?id=${value}`,
      });
    }
  };

  useEffect(() => {
    dispatch(getRecords({}));
  }, []);

  return (
    <ul className="menu bg-base-100 w-[97%] self-center rounded-box">
      <li className="bordered">
        {recordStatus === "loading"
          ? "Loading..."
          : records.map((record) => {
              return (
                <button
                  key={generateKey(record.title)}
                  onClick={() => {
                    goToRecord(record.id);
                  }}
                >
                  {record.order} | {record.title}
                </button>
              );
            })}
      </li>
    </ul>
  );
}
