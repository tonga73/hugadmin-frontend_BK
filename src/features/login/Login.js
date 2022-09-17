import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../providers/AuthProvider";

import { selectIsSignedIn } from "../../store/slices/users.slice";

export default function Login() {
  const { CLIENT_ID, SCOPES, login, logout, onFailure } = useAuth();

  const isSignedIn = useSelector(selectIsSignedIn);

  if (isSignedIn === null) {
    return <div>I don't know if we are signed in!</div>;
  } else if (isSignedIn) {
    return <div>SIP</div>;
  } else {
    return <div>NOP</div>;
  }
}
