import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Select, Form } from "../../commons/Form";

import { getRecord, editRecord } from "../../store/actions/records.actions";
import { selectRecord } from "../../store/slices/records.slice";

import Tracings from "../tracings/Tracings";

export default function Record() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const record = useSelector(selectRecord);

  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedPriority, setSelectedPriority] = useState();

  const contentPriority = [
    {
      name: "Nula",
      color: "bg-stone-900",
    },
    {
      name: "Baja",
      color: "bg-green-700",
    },
    {
      name: "Media",
      color: "bg-yellow-500",
    },
    {
      name: "Alta",
      color: "bg-orange-500",
    },
    {
      name: "Urgente",
      color: "bg-red-600",
    },
    {
      name: "Inactivo",
      color: "bg-stone-500",
    },
  ];

  const contentStatus = [
    {
      name: "Acepta cargo",
      color: "bg-stone-900",
    },
    {
      name: "Acto pericial realizado",
      color: "bg-green-900",
    },
    {
      name: "Pericia realizada",
      color: "bg-blue-500",
    },
    {
      name: "Sentencia o convenio de partes",
      color: "bg-blue-900",
    },
    {
      name: "Honorarios regulados",
      color: "bg-yellow-700",
    },
    {
      name: "En tratativa de cobro",
      color: "bg-purple-500",
    },
    {
      name: "Cobrado",
      color: "bg-purple-700",
    },
  ];

  const onSubmit = async (value, name) => {
    // debugger;
    if (name === "status") {
      const status = contentStatus.find((status) => status.name === value);
      setSelectedStatus(status);
    }
    if (name === "priority") {
      const priority = contentPriority.find(
        (priority) => priority.name === value
      );
      setSelectedPriority(priority);
    }
    await dispatch(
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
      const status = contentStatus.find(
        (status) => status.name === record.status
      );
      const priority = contentPriority.find(
        (priority) => priority.name === record.priority
      );
      setSelectedPriority(priority);
      setSelectedStatus(status);
    }
  }, [record]);

  return (
    <>
      {!!Object.keys(record).length && (
        <div className="flex gap-x-1.5 h-full">
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
                    selectedStatus && selectedStatus.color
                  }`}
                  defaultValue={record.status}
                  name="status"
                  options={contentStatus.map((status) => status.name)}
                  onChange={(e) => onSubmit(e.target.value, "status")}
                  value={selectedStatus && selectedStatus.name}
                />
              </Form>
              <div className="text-5xl font-extrabold text-neutral-focus">
                {record.order}
              </div>
              <div className="text-5xl font-extrabold text-neutral-focus text-opacity-60">
                {record.title.substring(0, 53)}
                <span
                  className="tooltip tooltip-bottom cursor-default z-30 text-left"
                  data-tip={record.title}
                >
                  ...
                </span>
              </div>
              {record.district && (
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
                    <div className="card-title">{record.district.name} | </div>
                    <div className="uppercase">{record.district.city}</div>
                  </div>
                </div>
              )}
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
