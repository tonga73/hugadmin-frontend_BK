import React from "react";
import { Routes, Route } from "react-router-dom";

// LAYOUTS
import MainLayout from "./layouts/MainLayout";

import NotFound from "./commons/NotFound";

import Stats from "./features/stats/Stats";
import Record from "./features/record/Record";
import NewRecord from "./features/record/NewRecord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Stats />} />
        <Route path="record/:id" element={<Record />} />
        <Route path="new-record" element={<NewRecord />} />
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
