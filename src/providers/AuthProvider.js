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

import { setSignedIn, selectIsSignedIn } from "../store/slices/users.slice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("user", null);
  const isSignedIn = useSelector(selectIsSignedIn);

  const auth = useRef(null);

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    "https://docs.googleapis.com/$discovery/rest?version=v1";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES =
    "profile email https://www.googleapis.com/auth/documents.readonly";

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
      SCOPES,
      login,
      logout,
      onFailure,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
