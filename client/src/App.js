import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import store from "./store";
import "./App.css";
import SignUp from "./components/SignUp";

function App() {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
