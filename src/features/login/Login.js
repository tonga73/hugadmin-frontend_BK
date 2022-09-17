import React from "react";
import { useSelector } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useAuth } from "../../providers/AuthProvider";

import { selectIsSignedIn } from "../../store/slices/users.slice";

export default function Login() {
  const { CLIENT_ID, login, logout, onFailure } = useAuth();

  const isSignedIn = useSelector(selectIsSignedIn);

  if (isSignedIn === null) {
    return <div>I don't know if we are signed in!</div>;
  } else if (isSignedIn) {
    return (
      <div>
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>
    );
  } else {
    return (
      <div>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={login}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        >
          LOGIN CON GOOGLE
        </GoogleLogin>
      </div>
    );
  }
}
