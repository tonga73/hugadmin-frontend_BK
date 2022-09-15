import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Transition } from "@headlessui/react";

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
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const tracings = useSelector(selectTracings);
  const tracingsQueryStatus = useSelector(selectTracingsQueryStatus);

  const record = useSelector(selectRecord);

  const onSubmit = (data) => {
    data.record = record.id;
    dispatch(newTracing(data));
  };

  useEffect(() => {
    if (
      tracingsQueryStatus === "created" ||
      tracingsQueryStatus === "deleted"
    ) {
      setIsCreating(false);
      dispatch(setTracingsQueryStatus(""));
      dispatch(getRecord(record.id));
    }
  }, [tracingsQueryStatus]);

  useEffect(() => {
    if (tracingsQueryStatus === "success") {
      dispatch(setTracingsQueryStatus(""));
    }
  }, [tracingsQueryStatus]);

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
      {tracings.map((tracing, index) => (
        <Tracing tracing={tracing} key={index} />
      ))}
    </div>
  );
}
