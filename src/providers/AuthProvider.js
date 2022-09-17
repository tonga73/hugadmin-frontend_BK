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
import { useLocalStorage } from "../utils/useLocalStorage";
import { gapi } from "gapi-script";

import { setSignedIn, selectIsSignedIn } from "../store/slices/users.slice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("user", null);
  const isSignedIn = useSelector(selectIsSignedIn);

  const auth = useRef(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    "https://docs.googleapis.com/$discovery/rest?version=v1";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/documents.readonly";

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  const onAuthChange = () => {
    dispatch(
      setSignedIn({
        queryStatus:
          auth.current.isSignedIn.get() === false ? "logedout" : "logedin",
        isSignedIn: auth.current.isSignedIn.get(),
      })
    );
  };

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data.profileObj);
    navigate("/");
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  // call this function to sign out logged in user
  const logout = () => {
    dispatch(
      setSignedIn({
        queryStatus: "logout",
        isSignedIn: null,
      })
    );
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
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
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
      gapiInited = true;
    });
  }, [isSignedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
