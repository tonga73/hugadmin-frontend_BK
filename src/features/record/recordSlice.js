import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchNewRecord, fetchGetRecords } from "./recordAPI";

const initialState = {
  status: "",
  record: {},
};

export const newRecord = createAsyncThunk(
  "records/fetchNewRecord",
  async (record, { rejectWithValue }) => {
    const response = await fetchNewRecord(record);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    console.log(response);
  }
);

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setSelectedRecord: (state, action) => {
      state.record = action.payload;
    },
  },
});

export const { setSelectedRecord } = recordSlice.actions;

export const selectRecordStatus = (state) => state.record.status;

export const selectRecords = (state) => state.record.records;

export default recordSlice.reducer;
