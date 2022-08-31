import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "./forms/RecordForm";

export function NewRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="px-3 py-1.5 flex flex-col gap-y-3">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-circle btn-sm"
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
      </button>
      <h3 className="text-xl font-bold uppercase">Crear expediente</h3>
      <RecordForm />
    </div>
  );
}
