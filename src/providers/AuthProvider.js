import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";

import { useLocalStorage } from "../utils/useLocalStorage";

import { setSignedIn, selectIsSignedIn } from "../store/slices/users.slice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("user", null);

  const auth = useRef(null);

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "profile email";

  const initClient = () => {
    // setIsLoadingGoogleDriveApi(true);
    gapi.load(
      "client:auth2",
      () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            // redirect_uri: ''
          })
          .then(function () {
            auth.current = gapi.auth2.getAuthInstance();
            auth.current.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
      },
      []
    );
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      console.log("LOGUEADO");
      dispatch(setSignedIn(isSignedIn));
    } else {
      console.log("NO LOGUEADO");
      dispatch(setSignedIn(isSignedIn));
      // prompt user to sign in
    }
  };

  // call this function when you want to authenticate the user
  const login = async (data) => {
    await auth.current.signIn();

    const user = {};

    user.name = auth.current.currentUser.le.wt.Ad;
    user.email = auth.current.currentUser.le.wt.cu;
    user.imageUrl = auth.current.currentUser.le.wt.hK;
    user.givenName = auth.current.currentUser.le.wt.rV;
    user.familyName = auth.current.currentUser.le.wt.uT;

    setUser(user);
    navigate("/");
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  // call this function to sign out logged in user
  const logout = () => {
    auth.current.signOut();
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      CLIENT_ID,
      login,
      logout,
      onFailure,
    }),
    [user]
  );

  useEffect(() => {
    gapi.load("client", {
      callback: function () {
        // Handle gapi.client initialization.
        initClient();
      },
      onerror: function () {
        // Handle loading error.
        alert("gapi.client failed to load!");
      },
      timeout: 5000, // 5 seconds.
      ontimeout: function () {
        // Handle timeout.
        alert("gapi.client could not load in a timely manner!");
      },
    });
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
