import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryStatus: "",
  users: [],
  filteredUsers: [],
  activeUser: {
    isSignedIn: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
      state.activeUser.isSignedIn = action.payload.isSignedIn;
    },
  },
});

export const { setSignedIn } = usersSlice.actions;

export const selectIsSignedIn = (state) => state.users.isSignedIn;

export default usersSlice.reducer;
