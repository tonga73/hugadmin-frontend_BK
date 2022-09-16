import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spinner from "../../commons/Spinner";

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
      recordsQueryStatus === "success" ||
      recordsQueryStatus === "created" ||
      recordsQueryStatus === "deleted"
    ) {
      dispatch(setRecordsQueryStatus(""));
    }
  }, [recordsQueryStatus, dispatch]);

  return (
    <ul className="menu bg-base-100 w-[97%] h-full self-center rounded-box">
      <li className="menu-title py-1.5 font-bold opacity-50">{`(${
        records.length
      }) EXPEDIENTE${records.length > 1 ? "S" : ""}`}</li>
      {recordsQueryStatus === "loading" ? (
        <Spinner />
      ) : (
        records.map((record, index) => {
          return (
            <li key={index}>
              <button
                className={`${selectedRecordId === record.id ? "" : ""}`}
                key={index}
                onClick={() => {
                  goToRecord(record.id);
                }}
              >
                {record.order} | {`${record.title.substring(0, 30)} ...`}
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
}
