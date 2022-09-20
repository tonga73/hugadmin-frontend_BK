import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGetRecords,
  fetchGetRecord,
  fetchNewRecord,
  fetchEditRecord,
  fetchDeleteRecord,
} from "../../app/fetchAPI/recordsAPI";

import { setRecord, setRecordsStatus } from "../slices/records.slice";

import { getCourt } from "./courts.actions";

export const getRecords = createAsyncThunk(
  "records/fetchGetRecords",
  async ({ rejectWithValue }) => {
    const response = await fetchGetRecords();

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response.reverse();
  }
);

export const getRecord = createAsyncThunk(
  "records/fetchGetRecord",
  async (record, { rejectWithValue, dispatch }) => {
    const response = await fetchGetRecord(record);

    if (!!response.officeId) {
      dispatch(getCourt(response.office.courtId));
    }

    dispatch(setRecord(response));
  }
);

export const newRecord = createAsyncThunk(
  "records/fetchNewRecord",
  async (record, { rejectWithValue, dispatch }) => {
    const response = await fetchNewRecord(record);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    console.log(response);

    dispatch(setRecordsStatus("created"));
    dispatch(setRecord(response));
  }
);

export const removeRecord = createAsyncThunk(
  "records/fetchDeleteRecord",
  async (recordId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteRecord(recordId);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecordsStatus("deleted"));
    dispatch(setRecord(response));
  }
);

export const editRecord = createAsyncThunk(
  "records/fetchEditRecord",
  async (record, { rejectWithValue, dispatch }) => {
    const response = await fetchEditRecord(record);

    dispatch(setRecordsStatus("edited"));
    dispatch(getRecords({}));
    dispatch(setRecord(response));
  }
);
