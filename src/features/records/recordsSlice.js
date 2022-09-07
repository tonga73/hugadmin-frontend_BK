import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetRecords } from "./recordsAPI";

const initialState = {
  status: "",
  records: [],
  filteredRecords: [],
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
  reducers: {
    setRecordsStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setFilteredRecords: (state, action) => {
      state.filteredRecords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.status = "success";
        state.records = action.payload;
        state.filteredRecords = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setRecordsStatus, setFilteredRecords } = recordsSlice.actions;

export const selectRecordsStatus = (state) => state.records.status;

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
