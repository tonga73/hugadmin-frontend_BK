import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ButtonGroup, Button, Badge } from "react-daisyui";

import { XyzTransitionGroup, xyz, XyzTransition } from "@animxyz/react";

import {
  selectFilteredRecords,
  selectRecordsStatus,
  setRecordsStatus,
  selectRecord,
  filterRecords,
  selectColorsTracing,
} from "../../store/slices/records.slice";
import {
  selectCourts,
  selectCourtStatus,
} from "../../store/slices/courts.slice";

import { getRecords } from "../../store/actions/records.actions";
import { setCourtsStatus } from "../../store/slices/courts.slice";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recordsStatus = useSelector(selectRecordsStatus);
  const records = useSelector(selectFilteredRecords);
  const selectedRecord = useSelector(selectRecord);
  const selectedRecordId = selectedRecord.id;
  const contentTracing = useSelector(selectColorsTracing);
  const courtsStatus = useSelector(selectCourtStatus);

  const goToRecord = (value) => {
    navigate(`record/${value}`);
  };

  const xyzUtilities = {
    down: false,
    small: false,
    "rotate-right": false,
  };

  useEffect(() => {
    if (recordsStatus === "created") {
      navigate(`record/${selectedRecordId}`);
      dispatch(getRecords({}));
    } else if (recordsStatus === "deleted") {
      navigate(`/`);
      dispatch(getRecords({}));
    }
  }, [recordsStatus, dispatch, navigate, selectedRecordId]);

  useEffect(() => {
    if (
      recordsStatus === "success" ||
      courtsStatus === "success" ||
      recordsStatus === "created" ||
      recordsStatus === "deleted" ||
      recordsStatus === "edited"
    ) {
      dispatch(setRecordsStatus(""));
      dispatch(setCourtsStatus(""));
    }
  }, [recordsStatus, dispatch]);

  useEffect(() => {
    if (courtsStatus === "success") {
      dispatch(setCourtsStatus(""));
    }
  }, [courtsStatus, dispatch]);

  const generateTracingColors = (value) => {
    const tracing = contentTracing.find((tracing) => tracing.name === value);

    return tracing.color;
  };

  return (
    <>
      <div className="py-1.5 font-bold opacity-50">
        {`(${records.length}) EXPEDIENTE${records.length > 1 ? "S" : ""}`}
      </div>
      {recordsStatus === "loading" ? (
        <XyzTransition
          appear={recordsStatus === "loading"}
          xyz={xyz("fade", xyzUtilities)}
        >
          <Button
            color="ghost"
            loading={recordsStatus === "loading"}
            fullWidth
          />
        </XyzTransition>
      ) : (
        <XyzTransitionGroup
          appear
          duration="auto"
          xyz="fade small origin-left duration-3 appear-stagger"
          className="z-0"
        >
          {records.map((record, index) => (
            <div key={index} className="flex w-full items-center gap-0.5">
              <Badge
                onClick={() => {
                  dispatch(filterRecords(record.tracing));
                  navigate(`record/${record.id}`);
                }}
                animation="true"
                className={`flex-none cursor-pointer opacity-50 hover:opacity-100 ${generateTracingColors(
                  record.tracing
                )}`}
              />
              <Button
                onClick={() => goToRecord(record.id)}
                active={record.id === selectedRecordId}
                color="ghost"
                animation="true"
                size="sm"
                className="truncate inline-block text-base flex-1"
              >
                <span className="px-1.5">
                  {record.order} | {record.name}
                </span>
              </Button>
            </div>
          ))}
        </XyzTransitionGroup>
      )}
    </>
  );
};
