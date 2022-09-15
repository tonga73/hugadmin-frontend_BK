import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";

import { selectRecord, setRecord } from "../store/slices/records.slice";
import { setTracing } from "../store/slices/tracings.slice";

import { removeRecord } from "../store/actions/records.actions";

export function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const record = useSelector(selectRecord);
  const selectedRecordId = record.id;

  const goToStats = () => {
    dispatch(setRecord({ queryStatus: "", record: {} }));
    dispatch(setTracing({ queryStatus: "", tracings: [], tracing: {} }));
    navigate(`/`);
  };

  function RemoveRecordButton() {
    return (
      <>
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
      </>
    );
  }

  function RemoveRecordModalContent() {
    return (
      <>
        <h3 className="font-bold text-lg text-center opacity-80 text-warning inline-flex">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          Confirma ELIMINAR DEFINITIVAMENTE el expediente:
        </h3>
        <p className="py-4 text-xl font-bold uppercase text-center">
          {record.order} | {record.title}
        </p>
      </>
    );
  }

  return (
    <div
      className={`navbar gap-x-1.5 bg-base-100 opacity-50 hover:opacity-100 ${
        !!Object.keys(record).length ? "" : "pointer-events-none opacity-10"
      }`}
    >
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
            onClick={goToStats}
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
        <Modal
          htmlFor="remove-record-modal"
          modalAction={
            <>
              <label
                htmlFor="remove-record-modal"
                onClick={() => dispatch(removeRecord(selectedRecordId))}
                className="btn btn-error"
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
                Eliminar Expediente
              </label>
              <label htmlFor="remove-record-modal" className="btn">
                Cancelar
              </label>
            </>
          }
          openButtonContent={<RemoveRecordButton />}
          openButtonStyles="btn btn-sm btn-outline btn-error"
        >
          <RemoveRecordModalContent />
        </Modal>
      </div>
    </div>
  );
}
