import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { newRecord } from "../recordSlice";

import { v4 } from "node-uuid";

import { getLocations, selectLocations } from "../../location/locationSlice";

export function RecordForm() {
  const dispatch = useDispatch();

  const locations = useSelector(selectLocations);

  function createLocationModal() {
    return (
      <>
        <input
          type="checkbox"
          id="create-location-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="modal-action">
              <label for="create-location-modal" className="btn">
                OK
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => dispatch(newRecord(data));

  useEffect(() => {
    dispatch(getLocations([]));
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-control flex flex-col gap-y-3"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input
        className="input input-bordered input-lg w-full max-w-xs"
        placeholder="Caratula"
        {...register("title", { required: true })}
      />
      {/* include validation with required or other standard HTML validation rules */}
      <input
        className="input input-bordered input-lg w-full max-w-xs"
        placeholder="Orden"
        {...register("order")}
      />
      <input
        className="input input-bordered input-lg w-full max-w-xs"
        placeholder="Estado"
        {...register("status")}
      />
      <input
        className="input input-bordered input-lg w-full max-w-xs"
        placeholder="Prioridad"
        {...register("priority")}
      />
      <div className="input-group gap-1 items-center">
        <select
          defaultValue={locations[0]}
          {...register("location")}
          className="select select-bordered select-lg w-full max-w-xs"
        >
          {locations.map((location) => {
            return <option key={v4()}>{location.name}</option>;
          })}
        </select>
        <label
          for="create-location-modal"
          className="btn btn-outline btn-secondary btn-square"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </label>
      </div>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <input
        type="submit"
        value="Crear"
        className="btn btn-outline w-full max-w-xs"
      />
      {createLocationModal()}
    </form>
  );
}
