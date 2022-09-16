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
    <ul className="menu bg-base-100 w-[97%] h-full self-center rounded-box">
      <li className="menu-title py-1.5 font-bold opacity-50">{`(${
        records.length
      }) EXPEDIENTE${records.length > 1 ? "S" : ""}`}</li>
      {recordsQueryStatus !== "" ? (
        <div className="h-full flex justify-center items-center">
          <div
            className="radial-progress animate-spin opacity-50"
            style={{ "--value": 70 }}
          ></div>
        </div>
      ) : (
        records.map((record, index) => {
          return (
            <li className="bordered">
              <button
                className={selectedRecordId === record.id ? "active" : ""}
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
