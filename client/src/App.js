import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import store from "./store";
import "./App.css";
import SignUp from "./components/SignUp";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

function App() {
  useEffect(() => {
    // sstore.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/privacy">
          <Privacy />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
