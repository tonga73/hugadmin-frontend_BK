import { createSlice } from "@reduxjs/toolkit";

import { getDistricts } from "../actions/districts.actions";

const initialState = {
  status: "",
  districts: [],
};

export const districtsSlice = createSlice({
  name: "districts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDistricts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.status = "success";
        state.districts = action.payload;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectDistricts = (state) => state.districts.districts;

export default districtsSlice.reducer;
