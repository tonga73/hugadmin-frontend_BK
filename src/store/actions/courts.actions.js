import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchGetCourt } from "../../app/fetchAPI/courtsAPI";

import { setCourt, setCourtStatus } from "../slices/courts.slice";

export const getCourt = createAsyncThunk(
  "courts/fetchGetCourt",
  async (courtId, { rejectWithValue, dispatch }) => {
    const response = await fetchGetCourt(courtId);

    dispatch(setCourt(response));
  }
);
