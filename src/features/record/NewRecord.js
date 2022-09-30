import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Form, Input, Radio, Navbar, Button, Modal } from "react-daisyui";

import {
  setRecord,
  selectColorsPriority,
  selectColorsTracing,
  setRecordsStatus,
} from "../../store/slices/records.slice";
import { selectCourts, selectCourt } from "../../store/slices/courts.slice";

import { getCourts, getCourt } from "../../store/actions/courts.actions";

import { newRecord } from "../../store/actions/records.actions";

export default function NewRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch("office")); // watch input value by passing the name of it

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const contentPriority = useSelector(selectColorsPriority);
  const contentTracing = useSelector(selectColorsTracing);
  const courts = useSelector(selectCourts);
  const selectedCourt = useSelector(selectCourt);

  const Offices = () => {
    const officesNames = ["UNICA", "UNO", "DOS", "TRES"];

    return (
      <select
        className="select select-bordered w-1/2"
        {...register("office", { required: true })}
      >
        {officesNames.map((office, index) => {
          return (
            <option key={index} value={office}>
              SEC. {office}
            </option>
          );
        })}
      </select>
    );
  };

  const onSubmit = (data) => {
    dispatch(setRecordsStatus("creating"));
    dispatch(newRecord(data));
  };

  useEffect(() => {
    dispatch(getCourts({}));
    dispatch(setRecordsStatus("creating"));
    dispatch(setRecord({}));
  }, [dispatch]);

  return (
    <div className="px-3 py-1.5 h-full flex flex-col gap-y-3">
      <Navbar>
        <Navbar.Start>
          <Button
            color="ghost"
            shape="circle"
            size="sm"
            onClick={() => navigate(-1)}
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
          </Button>
        </Navbar.Start>
        <Navbar.Center>
          <h3 className="text-right font-extrabold text-3xl uppercase flex-none opacity-30">
            Crear expediente
          </h3>
        </Navbar.Center>
      </Navbar>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full gap-1.5 p-1"
      >
        <div className="flex gap-1.5">
          <select
            className="select select-bordered flex-1"
            {...register("priority", { required: true })}
          >
            {contentPriority.map((priority, index) => {
              return (
                <option key={index} value={priority.name}>
                  {priority.name}
                </option>
              );
            })}
          </select>
          <select
            className="select select-bordered flex-1"
            {...register("tracing", { required: true })}
          >
            {contentTracing.map((tracing, index) => {
              return (
                <option key={index} value={tracing.name}>
                  {tracing.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Número de Expediente</span>
          </label>
          <Input
            size="lg"
            placeholder="Ej: 1234/2000"
            className="col-span-2 uppercase"
            {...register("order", { required: true })}
          />

          {errors.order && (
            <span className="mt-1 p-0.5 bg-error font-bold">
              Este campo es obligatorio.
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Carátula del Expediente</span>
          </label>
          <Input
            size="lg"
            placeholder="Ej: Martinez c/ Empresa Explotadora"
            className="col-span-2 uppercase"
            {...register("name", { required: true })}
          />

          {errors.order && (
            <span className="mt-1 p-0.5 bg-error font-bold">
              Este campo es obligatorio.
            </span>
          )}
        </div>

        <div className="flex gap-1.5 pt-1.5">
          <select
            className="select select-bordered flex-1 uppercase"
            {...register("courtId", { required: true, valueAsNumber: true })}
          >
            {courts.map((court, index) => {
              return (
                <option key={index} value={court.id}>
                  {court.name} | {court.city}
                </option>
              );
            })}
          </select>

          <Offices className="flex-1" value={selectedCourt.offices} />
        </div>

        <div className="flex-grow flex place-content-end items-end">
          <Button type="submit" size="lg">
            CREAR
          </Button>
        </div>
      </Form>
    </div>
  );
}
