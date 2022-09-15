import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

import recordsSlice from "./slices/records.slice";

import tracingsSlice from "./slices/tracings.slice";

import districtSlice from "../features/district/districtSlice";
import districtsSlice from "../features/districts/districtsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    records: recordsSlice,
    tracings: tracingsSlice,
    district: districtSlice,
    districts: districtsSlice,
  },
});
