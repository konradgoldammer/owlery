import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import store from "../store";
import { useSelector } from "react-redux";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import SmallFooter from "./subcomponents/SmallFooter";
import { login } from "../actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  //validation function
  const validateForm = () => username.length > 0 && password.length > 0;

  //login call function
  const handleLogin = (e) => {
    e.preventDefault();

    const user = { username, password };

    store.dispatch(login(user));
  };

  return (
    <div className="access-container">
      <Form className="access-form" onSubmit={handleLogin}>
        <h2 className="access-title text-center text-lowercase">owlery</h2>
        <div className="inside-access-form">
          <FormGroup row className="mb-2 mt-4">
            <Label for="email">Username or email address</Label>
            <Col sm={12}>
              <Input
                type="text"
                name="email"
                id="email"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="my-2">
            <Label for="password">
              Password
              <Link
                className="forgot-password text-secondary link-secondary text-decoration-none"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </Label>
            <Col sm={12}>
              <Input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </FormGroup>
          <Button
            className="access-btn btn btn-sm text-uppercase my-4"
            color="primary"
            disabled={!validateForm()}
          >
            <strong>Sign In</strong>
          </Button>
          <p className="choose-other-access-option">
            New to owlery?{" "}
            <Link
              to="/create-account"
              className="text-secondary link-secondary text-decoration-none"
            >
              Create an account.
            </Link>
          </p>
        </div>
      </Form>
      <SmallFooter />
      {auth.isAuthenticated && <Redirect to="/" />}
    </div>
  );
};

export default Login;
