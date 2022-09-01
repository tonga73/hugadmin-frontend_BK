import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useSearchParams } from "react-router-dom";

import { generateKey } from "../../utils/generateKey";

import { getRecord, selectRecord } from "./recordSlice";
import { selectRecords, selectRecordsStatus } from "../records/recordsSlice";

export function Record() {
  const dispatch = useDispatch();

  var [query, setQuery] = useSearchParams();

  const record = useSelector(selectRecord);

  const recordIdToString = query.toString().replace("id=", "");

  useEffect(() => {
    dispatch(getRecord(recordIdToString));
  }, [query]);

  return (
    <>
      {record.id == recordIdToString && (
        <div key={generateKey(record.order)} className="flex gap-x-1.5 h-full">
          <div className="w-2/3 h-full">
            <div className="flex flex-col gap-y-5 p-1.5 bg-base-content text-neutral-focus rounded-md">
              <div className="text-3xl">{record.priority}</div>
              <div className="text-3xl">{record.status}</div>
              <div className="text-5xl font-bold">{record.order}</div>
              <div className="text-5xl font-bold">{record.title}</div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-y-1.5">
            {record.tracings.map((tracing) => {
              return (
                <div
                  key={generateKey(tracing.name)}
                  className="bg-pink-300 card"
                >
                  <div className="card card-compact bg-secondary-content shadow-xl">
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
