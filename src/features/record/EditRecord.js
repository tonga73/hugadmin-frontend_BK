import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useSearchParams } from "react-router-dom";

import { Input, Select, Form } from "../../commons/Form";

import { getRecord, selectRecord } from "./recordSlice";
import {
  selectRecords,
  selectRecordsStatus,
} from "../../store/slices/records.slice";
import { getDistrict, selectDistrict } from "../district/districtSlice";
import {
  getDistricts,
  selectDistricts,
  selectDistrictsStatus,
} from "../districts/districtsSlice";

export function EditRecord() {
  const dispatch = useDispatch();

  var [query, setQuery] = useSearchParams();

  const record = useSelector(selectRecord);
  const recordIdToString = query.toString().replace("id=", "");

  const district = useSelector(selectDistrict);

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

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    dispatch(getRecord(recordIdToString));
    dispatch(getDistricts({}));
  }, [query]);

  return (
    <>
      {record.id == recordIdToString && (
        <div className="px-3 py-1.5 flex flex-col gap-y-3">
          <Form
            styles="form-control grid grid-cols-2 gap-3"
            onSubmit={onSubmit}
          >
            <Select
              styles="input input-bordered input-lg uppercase w-full"
              defaultValue={record.priority}
              name="priority"
              options={contentPriority}
            />
            <Select
              styles="input input-bordered input-lg uppercase w-full"
              defaultValue={record.tracing}
              name="tracing"
              options={contentStatus}
            />
            <Input
              name="order"
              defaultValue={record.order}
              required
              styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
            />
            <Input
              name="title"
              defaultValue={record.title}
              required
              placeholder="Carátula del Expediente"
              styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
            />

            <Select
              styles="input input-bordered input-lg w-full col-span-2 focus:bg-primary"
              defaultValue={district.name}
              name="districts"
              required
              options={districts}
            />

            <input
              type="submit"
              value="Guardar Cambios"
              className="btn btn-outline w-full max-w-xs col-start-2 place-self-end"
            />
          </Form>
        </div>
      )}
    </>
  );
}
