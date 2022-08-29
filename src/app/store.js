import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import locationSlice from "../features/location/locationSlice";
import recordSlice from "../features/record/recordSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    record: recordSlice,
    location: locationSlice,
  },
});
