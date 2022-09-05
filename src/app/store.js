import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import recordSlice from "../features/record/recordSlice";
import recordsSlice from "../features/records/recordsSlice";
import districtsSlice from "../features/districts/districtsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    record: recordSlice,
    records: recordsSlice,
    districts: districtsSlice,
  },
});
