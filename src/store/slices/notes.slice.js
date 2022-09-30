import { createSlice } from "@reduxjs/toolkit";

import { getRecord } from "../actions/records.actions";

const initialState = {
  status: "",
  notes: [],
  note: {},
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNote: (state, action) => {
      state.status = action.payload.status;
      state.notes = action.payload.notes;
      state.tracing = action.payload.tracing;
    },
    setNotesStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload.notes.slice().reverse();
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setNote, setNotesStatus } = notesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

export const selectNotesStatus = (state) => state.notes.status;

export default notesSlice.reducer;
