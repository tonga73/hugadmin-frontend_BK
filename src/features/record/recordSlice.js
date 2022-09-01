import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchNewRecord, fetchGetRecords, fetchGetRecord } from "./recordAPI";

const initialState = {
  status: "",
  record: {},
};

export const getRecord = createAsyncThunk(
  "record/fetchGetRecord",
  async (record, { rejectWithValue }) => {
    const response = await fetchGetRecord(record);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response;
  }
);

export const newRecord = createAsyncThunk(
  "record/fetchNewRecord",
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
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.status = "success";
        state.record = action.payload;
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectRecordStatus = (state) => state.record.status;

export const selectRecord = (state) => state.record.record;

export default recordSlice.reducer;
