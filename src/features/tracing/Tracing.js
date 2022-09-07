import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeTracing } from "./tracingSlice";

import { Form, Input } from "../../commons/Form";

export function CreateTracingForm({ isShown, onSubmit, id, onDelete }) {
  return (
    <>
      {!!isShown && (
        <div className="card card-compact bg-secondary-focus shadow-xl">
          <div className="card-body">
            <Form id={id} onSubmit={onSubmit} styles="card-title text-right">
              <Input
                required
                type="text"
                name="name"
                styles="text-right input focus:bg-primary"
              />
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default function Tracing({ tracing: { name, id } }) {
  const dispatch = useDispatch();
  return (
    <div className="card card-compact bg-secondary-content shadow-xl">
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
            <a onClick={() => dispatch(removeTracing(id))}>
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
}
