import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchNewTracing,
  fetchDeleteTracing,
} from "../../app/fetchAPI/tracingAPI";

import { setTracing } from "../slices/tracings.slice";

export const newTracing = createAsyncThunk(
  "tracing/fetchNewTracing",
  async (tracing, { rejectWithValue, dispatch }) => {
    const response = await fetchNewTracing(tracing);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setTracing({ queryStatus: "created", tracing: response }));
  }
);

export const removeTracing = createAsyncThunk(
  "tracing/fetchDeleteTracing",
  async (tracingId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteTracing(tracingId);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setTracing({ queryStatus: "deleted", tracing: response }));
  }
);
