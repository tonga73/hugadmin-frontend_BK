import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetRecords } from "./recordsAPI";

const initialState = {
  status: "",
  records: [],
};

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

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.status = "success";
        state.records = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectRecordsStatus = (state) => state.records.status;

export const selectRecords = (state) => state.records.records;

export default recordsSlice.reducer;
