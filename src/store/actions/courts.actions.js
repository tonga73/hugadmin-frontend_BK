import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchGetCourts, fetchGetCourt } from "../../app/fetchAPI/courtsAPI";

import { setCourt, setCourtsStatus } from "../slices/courts.slice";

export const getCourts = createAsyncThunk(
  "courts/fetchGetCourts",
  async ({ rejectWithValue, dispatch }) => {
    const response = await fetchGetCourts();

    return response;
  }
);

export const getCourt = createAsyncThunk(
  "courts/fetchGetCourt",
  async (courtId, { rejectWithValue, dispatch }) => {
    dispatch(setCourtsStatus("loading"));
    const response = await fetchGetCourt(courtId);

    dispatch(setCourt(response));
    dispatch(setCourtsStatus("success"));
  }
);
