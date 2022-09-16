import { createSlice } from "@reduxjs/toolkit";

import { getRecords } from "../actions/records.actions";

import { contentStatus, contentPriority } from "../../utils/recordColors";

const initialState = {
  queryStatus: "",
  records: [],
  filteredRecords: [],
  record: {},
  recordColors: {
    priority: contentPriority,
    status: contentStatus,
  },
};

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
      state.record = action.payload.record;
    },
    setRecordsQueryStatus: (state, action) => {
      state.queryStatus = action.payload;
    },
    setFilteredRecords: (state, action) => {
      state.filteredRecords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.queryStatus = "loading";
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.queryStatus = "success";
        state.records = action.payload;
        state.filteredRecords = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.queryStatus = "error";
      });
  },
});

export const { setRecordsQueryStatus, setFilteredRecords, setRecord } =
  recordsSlice.actions;

export const selectRecordsQueryStatus = (state) => state.records.queryStatus;

export const selectRecords = (state) => state.records.records;

export const selectRecord = (state) => state.records.record;

export const selectFilteredRecords = (state) => state.records.filteredRecords;

export const selectColorsPriority = (state) =>
  state.records.recordColors.priority;

export const selectColorsStatus = (state) => state.records.recordColors.status;

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
