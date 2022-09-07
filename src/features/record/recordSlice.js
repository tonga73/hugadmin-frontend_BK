import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchGetRecord,
  fetchNewRecord,
  fetchEditRecord,
  fetchDeleteRecord,
} from "./recordAPI";

const initialState = {
  status: "",
  record: {},
};

export const getRecord = createAsyncThunk(
  "record/fetchGetRecord",
  async (record, { rejectWithValue }) => {
    const response = await fetchGetRecord(record);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response;
  }
);

export const newRecord = createAsyncThunk(
  "record/fetchNewRecord",
  async (record, { rejectWithValue, dispatch }) => {
    const response = await fetchNewRecord(record);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecord({ status: "created", record: response }));
  }
);

export const removeRecord = createAsyncThunk(
  "record/fetchDeleteRecord",
  async (recordId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteRecord(recordId);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecord({ status: "deleted", record: response }));
  }
);

export const editRecord = createAsyncThunk(
  "record/fetchEditRecord",
  async (record, { rejectWithValue }) => {
    const response = await fetchEditRecord(record);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    console.log(response);
  }
);

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.status = action.payload.status;
      state.record = action.payload.record;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.status = "success";
        state.record = action.payload;
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setRecord } = recordSlice.actions;

export const selectRecordStatus = (state) => state.record.status;

export const selectRecord = (state) => state.record.record;

export default recordSlice.reducer;
