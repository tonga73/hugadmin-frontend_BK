import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetTracings } from "./tracingsAPI";

import { getRecord } from "../record/recordSlice";

const initialState = {
  status: "",
  tracings: [],
};

export const tracingsSlice = createSlice({
  name: "tracings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.status = "success";
        state.tracings = action.payload.tracings;
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectTracings = (state) => state.tracings.tracings;

export default tracingsSlice.reducer;
