import React from "react";

import { useAuth } from "../../providers/AuthProvider";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export function UserTopBar() {
  const { logout } = useAuth();
  const logOut = () => {
    logout();
  };
  return (
    <div className="navbar gap-x-1.5 bg-base-100 opacity-50 hover:opacity-100">
      <h3 className="text-3xl">User</h3>
      LOGOUT
    </div>
  );
}
