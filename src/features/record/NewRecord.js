import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Input, Select, Form } from "../../commons/Form";

import {
  getDistricts,
  selectDistricts,
  selectDistrictsStatus,
} from "../districts/districtsSlice";

import { newRecord } from "./recordSlice";

export function NewRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function selectProps(...props) {
    return function (obj) {
      const newObj = {};
      props.forEach((name) => {
        newObj[name] = obj[name];
      });

      return newObj.name;
    };
  }

  const districts = useSelector(selectDistricts).map(selectProps("name"));
  const districtsStatus = useSelector(selectDistrictsStatus);

  const contentPriority = [
    "Nula",
    "Baja",
    "Media",
    "Alta",
    "Urgente",
    "Inactivo",
  ];

  const contentStatus = [
    "Acepta cargo",
    "Acto pericial realizado",
    "Pericia realizada",
    "Sentencia o convenio de partes",
    "Honorarios regulados",
    "En tratativa de cobro",
    "Cobrado",
  ];

  const onSubmit = (data) => dispatch(newRecord(data));

  useEffect(() => {
    dispatch(getDistricts({}));
  }, []);

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
          styles="input input-bordered input-lg w-full"
          name="priority"
          options={contentPriority}
        />
        <Select
          styles="input input-bordered input-lg w-full"
          name="status"
          options={contentStatus}
        />
        <Input
          name="order"
          required
          placeholder="----/----"
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
        />
        <Input
          name="title"
          required
          placeholder="Carátula del Expediente"
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
        />

        <Select
          styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
          name="districts"
          options={districts}
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
