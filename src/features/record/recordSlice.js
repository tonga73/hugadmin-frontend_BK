import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchNewRecord, fetchGetRecords } from "./recordAPI";

const initialState = {
  status: "",
  record: {},
  records: [],
};

export const getRecords = createAsyncThunk(
  "records/fetchGetRecords",
  async ({ rejectWithValue }) => {
    const response = await fetchGetRecords();

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.status = "success";
        state.records = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setSelectedRecord } = recordSlice.actions;

export const selectRecordStatus = (state) => state.record.status;

export const selectRecords = (state) => state.record.records;

export default recordSlice.reducer;
