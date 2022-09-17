import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryStatus: "",
  users: [],
  filteredUsers: [],
  activeUser: {
    // ...JSON.parse(localStorage.getItem("user")),
    isSignedIn: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.activeUser.isSignedIn = action.payload;
    },
  },
});

export const { setSignedIn } = usersSlice.actions;

export const selectIsSignedIn = (state) => state.users.activeUser.isSignedIn;

export default usersSlice.reducer;
