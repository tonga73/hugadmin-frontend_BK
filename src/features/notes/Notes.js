import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Card, Button, Input, Form } from "react-daisyui";

import {
  selectNotes,
  selectNotesStatus,
  setNotesStatus,
} from "../../store/slices/notes.slice";
import { newNote, removeNote } from "../../store/actions/notes.actions";
import { getRecord } from "../../store/actions/records.actions";

export default function ({ record }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [val, setVal] = useState();
  const ref = useRef(null);
  console.log(location.pathname.replace("/record/", ""));

  const notes = useSelector(selectNotes);
  const notesStatus = useSelector(selectNotesStatus);

  const handleClick = () => {
    const target = document.getElementById("new-note-input");
    if (val !== undefined && val.length > 5) {
      dispatch(setNotesStatus("creating"));
      dispatch(newNote({ text: val, recordId: record.id }));
      target.value = "";
    } else if (val === undefined) {
      target.focus();
    } else {
      return;
    }
  };

  useEffect(() => {
    if (notesStatus === "created" || notesStatus === "deleted") {
      dispatch(setNotesStatus(""));
      dispatch(getRecord(record.id));
    }
  }, [notesStatus]);

  return (
    <div
      className={`h-full ${
        (notesStatus === "creating" || notesStatus === "deleting") &&
        "animate-pulse pointer-events-none"
      }`}
    >
      <div className="py-1 flex items-center justify-center gap-x-1">
        <Button type="button" onClick={handleClick} size="sm" shape="square">
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
        </Button>
        <Input
          id="new-note-input"
          bordered={false}
          size="sm"
          type="text"
          defaultValue={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      <div
        className="h-full flex flex-col p-0.5 gap-y-1.5 max-h-screen"
        xyz="fade small"
      >
        {notes !== undefined &&
          notes.map((note, index) => (
            <Card
              key={index}
              className={`gap-y-1 group bg-base-100 xyz-in ${
                Number(location.pathname.replace("/record/", "")) !==
                  record.id && "xyz-out"
              }`}
              bordered={false}
            >
              <Card.Body className="text-xl">{note.text}</Card.Body>
              <Card.Actions className="justify-end px-1 opacity-50 transition-opacity group-hover:opacity-100">
                <Button
                  color="ghost"
                  shape="square"
                  variant="outline"
                  size="xs"
                >
                  <svg
                    className="w-5 h-5"
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
                </Button>
                <Button
                  color="error"
                  shape="square"
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    dispatch(setNotesStatus("deleting"));
                    dispatch(removeNote(note.id));
                  }}
                >
                  <svg
                    className="w-5 h-5"
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
                </Button>
              </Card.Actions>
            </Card>
          ))}
      </div>
    </div>
  );
}
