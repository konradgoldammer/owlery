import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import store from "./store";
import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="container"></div>
    </Router>
  );
}

export default App;
