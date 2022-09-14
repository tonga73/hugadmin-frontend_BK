import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchNewTracing, fetchDeleteTracing } from "./tracingAPI";

const initialState = {
  queryStatus: "",
  tracing: {},
};

export const newTracing = createAsyncThunk(
  "tracing/fetchNewTracing",
  async (tracing, { rejectWithValue, dispatch }) => {
    const response = await fetchNewTracing(tracing);

    if (response.queryStatus === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setTracing({ queryStatus: "success", tracing: response }));
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

export const tracingSlice = createSlice({
  name: "tracing",
  initialState,
  reducers: {
    setTracing: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
      state.tracing = action.payload.tracing;
    },
  },
});

export const { setTracing } = tracingSlice.actions;

export const selectTracingQueryStatus = (state) => state.tracing.queryStatus;

export default tracingSlice.reducer;
