import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchGetDistricts } from "../../app/fetchAPI/districtsAPI";

export const getDistricts = createAsyncThunk(
  "districts/fetchGetDistricts",
  async ({ rejectWithValue }) => {
    const response = await fetchGetDistricts();

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response.reverse();
  }
);
