import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Transition } from "@headlessui/react";

import { selectTracingsQueryStatus } from "../../store/slices/tracings.slice";

import { removeTracing } from "../../store/actions/tracings.actions";

import { Form, Input } from "../../commons/Form";

export function CreateTracingForm({ isShown, onSubmit, id, onDelete }) {
  return (
    <Transition
      show={isShown}
      appear
      enter="transition ease-in-out duration-500 transform"
      enterFrom="translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition ease-in-out duration-500 transform"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="translate-x-full opacity-0"
    >
      <div className="card card-compact bg-secondary-focus shadow-xl">
        <div className="card-body">
          <Form id={id} onSubmit={onSubmit} styles="card-title text-right">
            <Input
              required
              type="text"
              name="name"
              styles="text-right input input-sm focus:bg-primary"
            />
          </Form>
        </div>
      </div>
    </Transition>
  );
}

export default function Tracing({ tracing: { name, id } }) {
  const dispatch = useDispatch();

  const tracingsQueryStatus = useSelector(selectTracingsQueryStatus);
  return (
    <Transition
      className="card card-compact bg-secondary-content shadow-xl"
      as="div"
      show={tracingsQueryStatus === ""}
      appear
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="card-body">
        <h2 className="card-title text-right">{name}</h2>
      </div>
      <div className="card-actions">
        <ul className="menu menu-horizontal menu-compact justify-between w-full rounded-box">
          <li className="disabled">
            {/* ARCHIVE TRACING BUTTON */}
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
            {/* REMOVE TRACING BUTTON */}
            <a
              onClick={() => dispatch(removeTracing(id))}
              className="hover:bg-error hover:bg-opacity-90"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  );
}
