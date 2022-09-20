import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  courts: [],
  filteredCourts: [],
  court: {},
};

export const courtsSlice = createSlice({
  name: "courts",
  initialState,
  reducers: {
    setCourt: (state, action) => {
      state.court = action.payload;
    },
    setCourtsStatus: (state, action) => {
      state.status = action.payload;
    },
    setFilteredCourts: (state, action) => {
      state.filteredCourts = action.payload;
    },
  },
});

export const { setCourt, setCourtsStatus, setFilteredCourts } =
  courtsSlice.actions;

export const selectCourt = (state) => state.courts.court;

export default courtsSlice.reducer;
