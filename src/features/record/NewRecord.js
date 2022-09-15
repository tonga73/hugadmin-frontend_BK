import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Input, Select, Form } from "../../commons/Form";

import {
  setRecord,
  selectColorsPriority,
  selectColorsStatus,
} from "../../store/slices/records.slice";
import { selectDistricts } from "../../store/slices/districts.slice";

import { newRecord } from "../../store/actions/records.actions";
import { getDistricts } from "../../store/actions/districts.actions";

export default function NewRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contentPriority = useSelector(selectColorsPriority).map((e) => e.name);
  const contentStatus = useSelector(selectColorsStatus).map((e) => e.name);

  const districtsNames = useSelector(selectDistricts);

  const onSubmit = (data) => {
    // Buscar ID del District por Nombre
    const district = districtsNames.find(
      (district) => district.name === data.districtId
    );
    data.districtId = district.id;

    dispatch(newRecord(data));
  };

  useEffect(() => {
    dispatch(getDistricts({}));
    dispatch(setRecord({ queryStatus: "creating", record: {} }));
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
          name="status"
          options={contentStatus}
        />
        <Input
          required
          name="order"
          placeholder="----/----"
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
        />
        <Input
          required
          name="title"
          placeholder="Carátula del Expediente"
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
        />

        <Select
          required
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
          name="districtId"
          defaultValue={districtsNames[0]}
          options={districtsNames.map((district) => district.name)}
        />

        <input
          type="submit"
          value="Crear"
          className="btn btn-outline w-full max-w-xs col-start-2 place-self-end"
        />
      </Form>
    </div>
  );
}
