import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useSearchParams } from "react-router-dom";

import { Input, Select, Form } from "../../commons/Form";

import { generateKey } from "../../utils/generateKey";

import { getRecord, selectRecord } from "./recordSlice";
import { selectRecords, selectRecordsStatus } from "../records/recordsSlice";
import { getDistrict, selectDistrict } from "../district/districtSlice";

export function Record() {
  const dispatch = useDispatch();

  var [query, setQuery] = useSearchParams();

  const record = useSelector(selectRecord);
  const recordIdToString = query.toString().replace("id=", "");

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
    dispatch(getDistrict(recordIdToString));
  }, [query]);

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
                  styles="input input-bordered input-lg uppercase w-full"
                  defaultValue={record.priority}
                  name="priority"
                  options={contentPriority}
                />
                <Select
                  styles="input input-bordered input-lg uppercase w-full"
                  defaultValue={record.status}
                  name="status"
                  options={contentStatus}
                />
              </Form>
              <div className="text-5xl font-bold text-neutral-focus">
                {record.order}
              </div>
              <div className="text-5xl font-bold text-neutral-focus">
                {record.title}
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
            {record.tracings.map((tracing) => {
              return (
                <div
                  key={generateKey(tracing.name)}
                  className="card card-compact bg-secondary-content shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title text-right">{tracing.name}</h2>
                  </div>
                  <div className="card-actions">
                    <ul className="menu menu-horizontal menu-compact justify-between w-full rounded-box">
                      <li>
                        <a>
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
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a>
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
