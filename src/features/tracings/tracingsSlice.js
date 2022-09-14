import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetTracings } from "./tracingsAPI";

import { getRecord } from "../record/recordSlice";

const initialState = {
  queryStatus: "",
  tracings: [],
};

export const tracingsSlice = createSlice({
  name: "tracings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.queryStatus = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.queryStatus = "success";
        state.tracings = action.payload.tracings;
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.queryStatus = "error";
      });
  },
});

export const selectTracings = (state) => state.tracings.tracings;

export default tracingsSlice.reducer;
