import { createSlice } from "@reduxjs/toolkit";

import { getRecord } from "../actions/records.actions";

const initialState = {
  queryStatus: "",
  tracings: [],
  tracing: {},
};

export const tracingsSlice = createSlice({
  name: "tracings",
  initialState,
  reducers: {
    setTracing: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
      state.tracing = action.payload.tracing;
    },
    setTracingsQueryStatus: (state, action) => {
      state.queryStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.queryStatus = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.queryStatus = "success";
        state.tracings = action.payload.tracings.slice().reverse();
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.queryStatus = "error";
      });
  },
});

export const { setTracing, setTracingsQueryStatus } = tracingsSlice.actions;

export const selectTracings = (state) => state.tracings.tracings;

export const selectTracingsQueryStatus = (state) => state.tracings.queryStatus;

export default tracingsSlice.reducer;
