import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryStatus: "",
  users: [],
  filteredUsers: [],
  user: JSON.parse(localStorage.getItem("user")),
  isSignedIn: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.queryStatus = action.payload.queryStatus;
      state.isSignedIn = action.payload.isSignedIn;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setSignedIn } = usersSlice.actions;

export const selectUser = (state) => state.users.user;

export const selectIsSignedIn = (state) => state.users.isSignedIn;

export default usersSlice.reducer;
