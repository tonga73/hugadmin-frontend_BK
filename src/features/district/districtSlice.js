import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetDistrict } from "./districtAPI";

const initialState = {
  status: "",
  district: {},
};

export const getDistrict = createAsyncThunk(
  "district/fetchGetDistrict",
  async (district, { rejectWithValue }) => {
    const response = await fetchGetDistrict(district);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    return response;
  }
);

export const districtSlice = createSlice({
  name: "district",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDistrict.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.status = "success";
        state.district = action.payload;
      })
      .addCase(getDistrict.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectDistrict = (state) => state.district.district;

export default districtSlice.reducer;
