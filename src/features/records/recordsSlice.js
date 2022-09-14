import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetRecords } from "./recordsAPI";

const initialState = {
  queryStatus: "",
  records: [],
  filteredRecords: [],
};

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

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecordsQueryStatus: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
    },
    setFilteredRecords: (state, action) => {
      state.filteredRecords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.queryStatus = "loading";
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.queryStatus = "success";
        state.records = action.payload;
        state.filteredRecords = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.queryStatus = "error";
      });
  },
});

export const { setRecordsQueryStatus, setFilteredRecords } =
  recordsSlice.actions;

export const selectRecordsQueryStatus = (state) => state.records.queryStatus;

export const selectRecords = (state) => state.records.records;

export const selectFilteredRecords = (state) => state.records.filteredRecords;

export const filterRecords = (search) => (dispatch, getState) => {
  const records = selectRecords(getState());
  if (search === "") {
    dispatch(setFilteredRecords(records));
  } else {
    const filteredRecords = records.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    dispatch(setFilteredRecords(filteredRecords));
  }
};

export default recordsSlice.reducer;
