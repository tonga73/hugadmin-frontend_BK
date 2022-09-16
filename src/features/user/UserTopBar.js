import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogout } from "react-google-login";

import { useAuth } from "../../providers/AuthProvider";

import { setUser } from "../../store/slices/users.slice";
import { setSignedIn } from "../../store/slices/users.slice";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export function UserTopBar() {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const logOut = () => {
    logout();
    dispatch(setUser(null));
    dispatch(
      setSignedIn({
        queryStatus: "logout",
        isSignedIn: null,
      })
    );
  };
  return (
    <div className="navbar gap-x-1.5 bg-base-100 opacity-50 hover:opacity-100">
      <h3 className="text-3xl">User</h3>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logOut}
      ></GoogleLogout>
    </div>
  );
}
