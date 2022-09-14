import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchGetRecord,
  fetchNewRecord,
  fetchEditRecord,
  fetchDeleteRecord,
} from "./recordAPI";

import { contentPriority, contentStatus } from "../../utils/recordColors";

const initialState = {
  queryStatus: "",
  record: {},
};

export const getRecord = createAsyncThunk(
  "record/fetchGetRecord",
  async (record, { rejectWithValue }) => {
    const response = await fetchGetRecord(record);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    return response;
  }
);

export const newRecord = createAsyncThunk(
  "record/fetchNewRecord",
  async (record, { rejectWithValue, dispatch }) => {
    const response = await fetchNewRecord(record);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecord({ queryStatus: "created", record: response }));
  }
);

export const removeRecord = createAsyncThunk(
  "record/fetchDeleteRecord",
  async (recordId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteRecord(recordId);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecord({ queryStatus: "deleted", record: response }));
  }
);

export const editRecord = createAsyncThunk(
  "record/fetchEditRecord",
  async (record, { rejectWithValue }) => {
    const response = await fetchEditRecord(record);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    console.log(response);
  }
);

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
      state.record = action.payload.record;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.queryStatus = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.queryStatus = "success";
        state.record = action.payload;
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.queryStatus = "error";
      });
  },
});

export const { setRecord } = recordSlice.actions;

export const selectRecordQueryStatus = (state) => state.record.queryStatus;

export const selectRecord = (state) => state.record.record;

export default recordSlice.reducer;
