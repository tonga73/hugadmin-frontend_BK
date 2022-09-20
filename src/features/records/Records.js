import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ButtonGroup, Button, Badge } from "react-daisyui";

import { XyzTransitionGroup } from "@animxyz/react";

import {
  selectFilteredRecords,
  selectRecordsStatus,
  setRecordsStatus,
  selectRecord,
  filterRecords,
  selectColorsTracing,
} from "../../store/slices/records.slice";

import { getRecords } from "../../store/actions/records.actions";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const records = useSelector(selectFilteredRecords);
  const record = useSelector(selectRecord);
  const selectedRecordId = record.id;
  const recordsStatus = useSelector(selectRecordsStatus);
  const contentTracing = useSelector(selectColorsTracing);

  const goToRecord = (value) => {
    navigate(`record/${value}`);
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
      recordsStatus === "created" ||
      recordsStatus === "deleted"
    ) {
      dispatch(setRecordsStatus(""));
    }
  }, [recordsStatus, dispatch]);

  const generateTracingColors = (value) => {
    const tracing = contentTracing.find((tracing) => tracing.name === value);

    return tracing.color;
  };

  return (
    <>
      {recordsStatus === "loading" ? (
        <Button loading={recordsStatus === "loading"} fullWidth />
      ) : (
        <XyzTransitionGroup
          appear
          duration="auto"
          xyz="fade flip-left origin-left duration-5 appear-stagger"
        >
          <ButtonGroup vertical className="gap-y-1.5">
            {records.map((record, index) => (
              <div key={index} className="flex w-full items-center gap-0.5">
                <Badge
                  onClick={() => {
                    dispatch(filterRecords(record.tracing));
                    navigate(`record/${record.id}`);
                  }}
                  animation
                  className={`flex-none cursor-pointer opacity-50 hover:opacity-100 ${generateTracingColors(
                    record.tracing
                  )}`}
                />
                <Button
                  onClick={() => goToRecord(record.id)}
                  active={record.id === selectedRecordId}
                  color="ghost"
                  animation={true}
                  size="sm"
                  className="truncate inline-block text-base flex-1"
                >
                  <span className="px-1.5">
                    {record.order} | {record.name}
                  </span>
                </Button>
              </div>
            ))}
          </ButtonGroup>
        </XyzTransitionGroup>
      )}
    </>
  );
};
