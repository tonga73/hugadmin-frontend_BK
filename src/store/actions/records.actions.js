import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGetRecords,
  fetchGetRecord,
  fetchNewRecord,
  fetchEditRecord,
  fetchDeleteRecord,
} from "../../app/fetchAPI/recordsAPI";

import { setRecord } from "../slices/records.slice";

export const getRecords = createAsyncThunk(
  "records/fetchGetRecords",
  async ({ rejectWithValue }) => {
    const response = await fetchGetRecords();

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    return response.reverse();
  }
);

export const getRecord = createAsyncThunk(
  "record/fetchGetRecord",
  async (record, { rejectWithValue, dispatch }) => {
    const response = await fetchGetRecord(record);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecord({ queryStatus: "success", record: response }));
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
