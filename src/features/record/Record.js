import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useSearchParams, useNavigate } from "react-router-dom";

import { Input, Select, Form } from "../../commons/Form";

import { generateKey } from "../../utils/generateKey";

import { getRecord, selectRecord, selectRecordStatus } from "./recordSlice";
import { selectRecords, selectRecordsStatus } from "../records/recordsSlice";
import { getDistrict, selectDistrict } from "../district/districtSlice";
import { selectTracingStatus, setTracing } from "../tracing/tracingSlice";

import Tracings from "../tracings/Tracings";

export default function Record() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var [query, setQuery] = useSearchParams();

  const record = useSelector(selectRecord);
  const recordStatus = useSelector(selectRecordStatus);
  const recordIdToString = query.toString().replace("id=", "");

  const tracingStatus = useSelector(selectTracingStatus);

  const district = useSelector(selectDistrict);

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
    dispatch(setTracing({ status: "", tracing: {} }));
  }, [query, tracingStatus]);

  useEffect(() => {
    if (recordStatus === "success" && record.districtId !== null) {
      dispatch(getDistrict(record.districtId));
    }
  }, [recordStatus]);

  return (
    <>
      {record.id == recordIdToString && (
        <div key={generateKey(record.order)} className="flex gap-x-1.5 h-full">
          <div className="w-2/3 h-full">
            <div className="flex flex-col gap-y-5 p-1.5 bg-base-content rounded-md">
              <Form
                styles="form-control grid grid-cols-2 gap-3"
                onSubmit={onSubmit}
              >
                <Select
                  styles="input input-bordered input-md font-bold uppercase w-full"
                  defaultValue={record.priority}
                  name="priority"
                  options={contentPriority}
                />
                <Select
                  styles="input input-bordered input-md font-bold uppercase w-full"
                  defaultValue={record.status}
                  name="status"
                  options={contentStatus}
                />
              </Form>
              <div className="text-5xl font-extrabold text-neutral-focus">
                {record.order}
              </div>
              <div className="text-5xl font-extrabold text-neutral-focus">
                {record.title.substring(0, 53)}
                <div
                  className="tooltip tooltip-bottom cursor-default z-30 text-left"
                  data-tip={record.title}
                >
                  ...
                </div>
              </div>
              <div className="card card-compact card-bordered shadow-xl font-bold text-neutral-focus">
                <div className="card-body flex-row items-center">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    ></path>
                  </svg>
                  <div className="card-title">{district.name} | </div>
                  <div className="uppercase">{district.city}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-y-1.5">
            <Tracings />
          </div>
        </div>
      )}
    </>
  );
}
