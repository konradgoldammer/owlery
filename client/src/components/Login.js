import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import store from "../store";
import { useSelector } from "react-redux";
import "../App.css";
import { Link } from "react-router-dom";
import { login } from "../actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.error);

  //validation function
  const validateForm = () => username.length > 0 && password.length > 0;

  //login call function
  const handleLogin = (e) => {
    e.preventDefault();

    const user = { username, password };

    store.dispatch(login(user));
  };
  return (
    <div className="login-container">
      <Form className="loginForm" onSubmit={handleLogin}>
        <h2 className="loginTitle">owlery</h2>
        <div className="insideLoginForm">
          <FormGroup row>
            <Label for="username">Username or email address</Label>
            <Col sm={12}>
              <Input
                type="text"
                name="username"
                id="username"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password">
              Password
              <Link className="forgotPass" to="forget-password">
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
            className="loginBtn btn btn-sm"
            color="primary"
            disabled={!validateForm()}
          >
            Sign In
          </Button>
          <p className="createAccount">
            New to owlery?{" "}
            <Link to="/create-account" className="createAccount">
              Create an account.
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
