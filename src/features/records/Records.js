import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectFilteredRecords,
  selectRecordsQueryStatus,
  setRecordsQueryStatus,
  selectRecord,
} from "../../store/slices/records.slice";

import { getRecords } from "../../store/actions/records.actions";

export function Records() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const records = useSelector(selectFilteredRecords);
  const record = useSelector(selectRecord);
  const selectedRecordId = record.id;
  const recordsQueryStatus = useSelector(selectRecordsQueryStatus);

  const goToRecord = (value) => {
    navigate(`record/${value}`);
  };

  useEffect(() => {
    if (recordsQueryStatus === "created") {
      navigate(`record/${selectedRecordId}`);
      dispatch(getRecords({}));
    } else if (recordsQueryStatus === "deleted") {
      navigate(`/`);
      dispatch(getRecords({}));
    }
  }, [recordsQueryStatus, dispatch, navigate, selectedRecordId]);

  useEffect(() => {
    if (
      recordsQueryStatus === "loading" ||
      recordsQueryStatus === "created" ||
      recordsQueryStatus === "deleted"
    ) {
      dispatch(setRecordsQueryStatus({ queryStatus: "" }));
    }
  }, [recordsQueryStatus, dispatch]);

  return (
    <ul className="menu bg-base-100 w-[97%] self-center rounded-box">
      <li className="bordered">
        {recordsQueryStatus === "loading"
          ? "Loading..."
          : records.map((record, index) => {
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
