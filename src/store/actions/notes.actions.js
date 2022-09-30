import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchNewNote,
  fetchDeleteNote,
  fetchGetNotes,
} from "../../app/fetchAPI/notesAPI";

import { setNote, setNotesStatus } from "../slices/notes.slice";

export const getNotes = createAsyncThunk(
  "notes/fetchGetNotes",
  async ({ rejectWithValue, dispatch }) => {
    const response = await fetchGetNotes();

    dispatch(setNotesStatus("created"));
    return response;
  }
);

export const newNote = createAsyncThunk(
  "note/fetchNewNote",
  async (note, { rejectWithValue, dispatch }) => {
    const response = await fetchNewNote(note);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setNote({ status: "created", note: response }));
  }
);

export const removeNote = createAsyncThunk(
  "note/fetchDeleteNote",
  async (noteId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteNote(noteId);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setNotesStatus("deleted"));
  }
);
