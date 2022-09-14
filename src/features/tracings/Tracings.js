import { current } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useSearchParams } from "react-router-dom";

import { getTracings, selectTracings } from "./tracingsSlice";
import { newTracing } from "../tracing/tracingSlice";
import { selectRecord } from "../record/recordSlice";

import TracingsTopBar from "./TracingsTopBar";

import Tracing, { CreateTracingForm } from "../tracing/Tracing";

export default function Tracings() {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);

  var [query, setQuery] = useSearchParams();

  const selectedRecord = useSelector(selectRecord).id;

  const tracings = useSelector(selectTracings);

  const handleCreateTracing = () => {
    setIsCreating((current) => !current);
  };

  const onSubmit = (data) => {
    data.record = selectedRecord;
    dispatch(newTracing(data));
  };

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
