import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

import recordsSlice from "./slices/records.slice";

import tracingsSlice from "./slices/tracings.slice";

import districtsSlice from "./slices/districts.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    records: recordsSlice,
    tracings: tracingsSlice,
    districts: districtsSlice,
  },
});
