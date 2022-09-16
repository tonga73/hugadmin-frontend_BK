import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./slices/users.slice";

import recordsSlice from "./slices/records.slice";

import tracingsSlice from "./slices/tracings.slice";

import districtsSlice from "./slices/districts.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    records: recordsSlice,
    tracings: tracingsSlice,
    districts: districtsSlice,
  },
});
