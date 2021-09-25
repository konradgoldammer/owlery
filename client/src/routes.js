import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import ForgotPass from "./components/ForgotPass";
import Home from "./components/Home";
import Profile from "./components/Profile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Home title="Owlery" />} />
        <Route
          path="/create-account"
          component={() => <SignUp title="Create Account" />}
        />
        <Route path="/login" component={() => <Login title="Login" />} />
        <Route path="/terms" component={() => <Terms title="Terms of Use" />} />
        <Route
          path="/privacy"
          component={() => <Privacy title="Privacy Policy" />}
        />
        <Route
          path="/forgot-password"
          component={() => <ForgotPass title="Recover Account" />}
        />
        <Route path="/:userId" component={() => <Profile title="Profile" />} />
      </Switch>
    </Router>
  );
};

export default Routes;
