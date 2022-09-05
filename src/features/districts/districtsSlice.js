import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetDistricts } from "./districtsAPI";

const initialState = {
  status: "",
  districts: [],
};

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

export const selectDistrictsStatus = (state) => state.districts.status;

export const selectDistricts = (state) => state.districts.districts;

export default districtsSlice.reducer;
