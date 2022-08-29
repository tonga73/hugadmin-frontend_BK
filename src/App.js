import React from "react";
import { Routes, Route } from "react-router-dom";

// LAYOUTS
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./features/dashboard/Dashboard";

import { Record } from "./features/record/Record";
import { NewRecord } from "./features/record/NewRecord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path=":id" element={<Record />} />
        <Route path="new-record" element={<NewRecord />} />
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
