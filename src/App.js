import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";

// LAYOUTS
import MainLayout from "./layouts/MainLayout";

import Login from "./features/login/Login";

import NotFound from "./commons/NotFound";

import Stats from "./features/stats/Stats";
import Record from "./features/record/Record";
import NewRecord from "./features/record/NewRecord";

import { ProtectedRoute } from "./utils/routeGuard";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="record/:id" element={<Record />} />
            <Route path="new-record" element={<NewRecord />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
