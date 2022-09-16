import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import { useAuth } from "../../providers/AuthProvider";

import {
  setSignedIn,
  setUser,
  selectIsSignedIn,
  selectUser,
} from "../../store/slices/users.slice";

export default function Login() {
  const dispatch = useDispatch();

  const { login } = useAuth();

  const isSignedIn = useSelector(selectIsSignedIn);

  const profile = useSelector(selectUser);

  const auth = useRef(null);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: clientId,
          scope: "profile email",
        })
        .then(() => {
          auth.current = gapi.auth2.getAuthInstance();
          dispatch(
            setSignedIn({
              queryStatus: "",
              isSignedIn: auth.current.isSignedIn.get(),
            })
          );
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, [isSignedIn]);

  const onAuthChange = () => {
    dispatch(
      setSignedIn({
        queryStatus:
          auth.current.isSignedIn.get() === false ? "logedout" : "logedin",
        isSignedIn: auth.current.isSignedIn.get(),
      })
    );
  };

  const onSuccess = (res) => {
    login(res.profileObj);
    dispatch(setUser(res.profileObj));
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    dispatch(
      setSignedIn({
        queryStatus: "logout",
        isSignedIn: null,
      })
    );
  };

  if (isSignedIn === null) {
    return <div>I don't know if we are signed in!</div>;
  } else if (isSignedIn) {
    return (
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logOut}
        ></GoogleLogout>
      </div>
    );
  } else {
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
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
