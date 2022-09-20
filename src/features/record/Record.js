import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Spinner from "../../commons/Spinner";
import Form, { Select } from "../../commons/Form";

import { getRecord, editRecord } from "../../store/actions/records.actions";
import {
  selectRecord,
  selectColorsPriority,
  selectColorsTracing,
} from "../../store/slices/records.slice";

export default () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const record = useSelector(selectRecord);
  const contentPriority = useSelector(selectColorsPriority);
  const contentTracing = useSelector(selectColorsTracing);

  const [selectedTracing, setSelectedTracing] = useState();
  const [selectedPriority, setSelectedPriority] = useState();

  const onSubmit = async (value, name) => {
    // debugger;
    if (name === "tracing") {
      const tracing = contentTracing.find((tracing) => tracing.name === value);
      setSelectedTracing(tracing);
    }
    if (name === "priority") {
      const priority = contentPriority.find(
        (priority) => priority.name === value
      );
      setSelectedPriority(priority);
    }
    dispatch(
      editRecord({
        id: record.id,
        req: { [name]: value },
      })
    );
  };

  useEffect(() => {
    dispatch(getRecord(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (record) {
      const tracing = contentTracing.find(
        (tracing) => tracing.name === record.tracing
      );
      const priority = contentPriority.find(
        (priority) => priority.name === record.priority
      );
      setSelectedPriority(priority);
      setSelectedTracing(tracing);
    }
  }, [record, contentPriority, contentTracing]);

  return (
    <>
      {!!Object.keys(record).length && record.name !== undefined ? (
        <div
          className={`flex gap-x-1.5 h-full ${
            Number(id) !== record.id && "animate-pulse transition-all"
          }`}
        >
          <div className="w-2/3 h-full">
            <div className="flex flex-col gap-y-5 p-1.5 bg-base-content rounded-md">
              <Form styles="form-control grid grid-cols-2 gap-3">
                <Select
                  styles={`input input-bordered input-md font-bold uppercase w-full  ${
                    selectedPriority && selectedPriority.color
                  }`}
                  defaultValue={record.priority}
                  name="priority"
                  options={contentPriority.map((priority) => priority.name)}
                  onChange={(e) => onSubmit(e.target.value, "priority")}
                  value={selectedPriority && selectedPriority.name}
                />
                <Select
                  styles={`input input-bordered input-md font-bold uppercase w-full ${
                    selectedTracing && selectedTracing.color
                  }`}
                  defaultValue={record.tracing}
                  name="tracing"
                  options={contentTracing.map((tracing) => tracing.name)}
                  onChange={(e) => onSubmit(e.target.value, "tracing")}
                  value={selectedTracing && selectedTracing.name}
                />
              </Form>
              <div className="text-5xl font-extrabold text-neutral-focus">
                {record.order}
              </div>
              <div className="text-5xl font-extrabold text-neutral-focus text-opacity-60">
                {record.name.substring(0, 53)}
                <span
                  className="tooltip tooltip-bottom cursor-default z-30 text-left"
                  data-tip={record.name}
                >
                  ...
                </span>
              </div>
              {record.office && (
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
                    <div className="card-title">{record.office.name} | </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-y-1.5">LOTRACIN</div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
