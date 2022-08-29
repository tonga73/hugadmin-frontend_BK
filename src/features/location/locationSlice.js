import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchLocations, fetchNewLocation } from "./locationAPI";

const initialState = {
  status: "",
  location: {},
  locations: [],
};

export const getLocations = createAsyncThunk(
  "records/fetchLocations",
  async ({ rejectWithValue }) => {
    const response = await fetchLocations();

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response;
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.status = "success";
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectLocations = (state) => state.location.locations;

export default locationSlice.reducer;
