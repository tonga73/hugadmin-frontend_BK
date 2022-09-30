import { createSlice } from "@reduxjs/toolkit";

import { getRecords } from "../actions/records.actions";

import { contentTracing, contentPriority } from "../../utils/recordColors";

const initialState = {
  status: "",
  records: [],
  filteredRecords: [],
  record: {},
  recordColors: {
    priority: contentPriority,
    tracing: contentTracing,
  },
};

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.record = action.payload;
    },
    setRecordsStatus: (state, action) => {
      state.status = action.payload;
    },
    setFilteredRecords: (state, action) => {
      state.filteredRecords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.status = "success";
        state.records = action.payload.slice().reverse();
        state.filteredRecords = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setRecordsStatus, setFilteredRecords, setRecord } =
  recordsSlice.actions;

export const selectRecordsStatus = (state) => state.records.status;

export const selectRecords = (state) => state.records.records;

export const selectRecord = (state) => state.records.record;

export const selectFilteredRecords = (state) => state.records.filteredRecords;

export const selectColorsPriority = (state) =>
  state.records.recordColors.priority;

export const selectColorsTracing = (state) =>
  state.records.recordColors.tracing;

export const filterRecords = (search) => (dispatch, getState) => {
  const records = selectRecords(getState());
  if (search.length > 1) {
    const filteredRecords = records.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    dispatch(setFilteredRecords(filteredRecords));
  } else {
    dispatch(setFilteredRecords(records));
  }
};

export default recordsSlice.reducer;
