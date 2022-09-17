import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../providers/AuthProvider";

import { selectIsSignedIn } from "../../store/slices/users.slice";

export default function Login() {
  const { login, logout, onFailure } = useAuth();

  const isSignedIn = useSelector(selectIsSignedIn);

  console.log(isSignedIn, "otro por aca");

  if (isSignedIn === null) {
    return <div>I don't know if we are signed in!</div>;
  } else if (isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={logout} className="btn btn-md btn-secondary">
          LOGOUT
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={login} className="btn btn-lg">
          Login
        </button>
      </div>
    );
  }
}
