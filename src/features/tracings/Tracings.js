import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectTracings,
  setTracingsQueryStatus,
  selectTracingsQueryStatus,
} from "../../store/slices/tracings.slice";
import { selectRecord } from "../../store/slices/records.slice";

import { newTracing } from "../../store/actions/tracings.actions";
import { getRecord } from "../../store/actions/records.actions";

import TracingsTopBar from "./TracingsTopBar";

import Tracing, { CreateTracingForm } from "../tracing/Tracing";

export default function Tracings() {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const tracings = useSelector(selectTracings);
  const tracingsQueryStatus = useSelector(selectTracingsQueryStatus);

  const record = useSelector(selectRecord);

  const selectedRecordId = record.id;

  const onSubmit = (data) => {
    data.record = selectedRecordId;
    dispatch(newTracing(data));
  };

  useEffect(() => {
    if (
      tracingsQueryStatus === "created" ||
      tracingsQueryStatus === "deleted"
    ) {
      setIsCreating(false);
      dispatch(setTracingsQueryStatus(""));
      dispatch(getRecord(selectedRecordId));
    }
  }, [tracingsQueryStatus, dispatch, selectedRecordId]);

  useEffect(() => {
    if (tracingsQueryStatus === "success") {
      dispatch(setTracingsQueryStatus(""));
    }
  }, [tracingsQueryStatus, dispatch]);

  return (
    <div className="flex flex-col gap-y-1.5">
      <TracingsTopBar
        onClick={() => setIsCreating((current) => !current)}
        isCreating={isCreating}
      />
      <CreateTracingForm
        id="create-tracing-form"
        onSubmit={onSubmit}
        isShown={isCreating}
      />
      {!!tracings &&
        tracings.map((tracing, index) => (
          <Tracing tracing={tracing} key={index} />
        ))}
    </div>
  );
}
