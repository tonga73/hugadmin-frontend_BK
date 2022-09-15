import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectRecord, setRecord } from "../store/slices/records.slice";
import { removeRecord } from "../store/actions/records.actions";

export function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToRecord = () => {
    dispatch(setRecord({ queryStatus: "", record: {} }));
    navigate(`/`);
  };

  const selectedRecordId = useSelector(selectRecord).id;

  return (
    <div className="navbar gap-x-1.5 bg-base-100 opacity-50 hover:opacity-100">
      <div className="flex-none">
        <button className="btn btn-sm btn-outline btn-info">
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
          Editar
        </button>
      </div>
      <div className="flex-1 px-3">
        <div className="tooltip tooltip-bottom" data-tip="Estadísticas">
          <button
            onClick={goToRecord}
            className="btn btn-sm btn-square btn-ghost"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-none gap-x-1">
        <button className="btn btn-sm btn-outline btn-ghost">
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
          Archivar
        </button>
        <button
          onClick={() => dispatch(removeRecord(selectedRecordId))}
          className="btn btn-sm btn-outline btn-error"
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
          Eliminar
        </button>
      </div>
    </div>
  );
}
