import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchNewTracing, fetchDeleteTracing } from "./tracingAPI";

const initialState = {
  status: "",
  tracing: {},
};

export const newTracing = createAsyncThunk(
  "tracing/fetchNewTracing",
  async (tracing, { rejectWithValue, dispatch }) => {
    const response = await fetchNewTracing(tracing);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setTracing({ status: "success", tracing: response }));
  }
);

export const removeTracing = createAsyncThunk(
  "tracing/fetchDeleteTracing",
  async (tracingId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteTracing(tracingId);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setTracing({ status: "deleted", tracing: response }));
  }
);

export const tracingSlice = createSlice({
  name: "tracing",
  initialState,
  reducers: {
    setTracing: (state, action) => {
      state.status = action.payload.status;
      state.tracing = action.payload.tracing;
    },
  },
});

export const { setTracing } = tracingSlice.actions;

export const selectTracingStatus = (state) => state.tracing.status;

export default tracingSlice.reducer;
