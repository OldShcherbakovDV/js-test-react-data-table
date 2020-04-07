import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { frontendPaths } from "./constants/frontend-paths";

import StatusPage from "./components/pages/stats-page";

export default function App() {
  return (
    <Router>
      <Route exact path={frontendPaths.stats}>
        <StatusPage />
      </Route>
      <Route exact path={'/'}>
        <Redirect to={frontendPaths.stats} />
      </Route>
    </Router>
  );
}
