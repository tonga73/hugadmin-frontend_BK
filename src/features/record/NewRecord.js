import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form, { Input, Select } from "../../commons/Form";

import {
  setRecord,
  selectColorsPriority,
  selectColorsTracing,
} from "../../store/slices/records.slice";

import { newRecord } from "../../store/actions/records.actions";

export default function NewRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contentPriority = useSelector(selectColorsPriority).map((e) => e.name);
  const contentTracing = useSelector(selectColorsTracing).map((e) => e.name);

  const onSubmit = (data) => {
    dispatch(newRecord(data));
  };

  useEffect(() => {
    dispatch(setRecord({ status: "creating", record: {} }));
  }, [dispatch]);

  return (
    <div className="px-3 py-1.5 flex flex-col gap-y-3">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-circle btn-sm"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
      </button>
      <h3 className="text-xl font-bold uppercase">Crear expediente</h3>
      <Form styles="form-control grid grid-cols-2 gap-3" onSubmit={onSubmit}>
        <Select
          required
          styles="input input-bordered input-lg w-full"
          name="priority"
          options={contentPriority}
        />
        <Select
          required
          styles="input input-bordered input-lg w-full"
          name="tracing"
          options={contentTracing}
        />
        <Input
          required
          name="order"
          placeholder="----/----"
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
        />
        <Input
          required
          name="name"
          placeholder="Carátula del Expediente"
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
        />

        {/* <CustomSelect
          required
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
          name="officeId"
          defaultValue={}
          options={}
        /> */}

        <input
          type="submit"
          value="Crear"
          className="btn btn-outline w-full max-w-xs col-start-2 place-self-end"
        />
      </Form>
    </div>
  );
}
