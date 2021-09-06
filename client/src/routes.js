import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/terms" component={Terms}></Route>
        <Route path="/privacy" component={Privacy}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
