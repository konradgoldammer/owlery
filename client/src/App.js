import React, { useEffect } from "react";
import { loadUser } from "./actions/authActions";
import store from "./store";
import "./App.css";
import Routes from "./routes";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return <Routes />;
}

export default App;
