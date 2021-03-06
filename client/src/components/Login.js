import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import store from "../store";
import { useSelector } from "react-redux";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import SmallFooter from "./shared/SmallFooter";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

const Login = (props) => {
  const initialState = { data: "", password: "" };

  const [data, setData] = useState(initialState.data);
  const [password, setPassword] = useState(initialState.password);

  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Remove errors on page load
    store.dispatch(clearErrors());

    // Set page title
    document.title = props.title;
  }, [props.title]);

  // Validation function
  const validateForm = () => data.length === 0 || password.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { data, password };

    store.dispatch(login(user));
  };

  return (
    <div className="access-container">
      <Form className="access-form" onSubmit={handleSubmit}>
        <h2 className="access-title text-center text-lowercase">owlery</h2>
        <div className="inside-access-form">
          <FormGroup row className="mb-2 mt-4">
            <Label for="data">Username or Email address</Label>
            <Col sm={12}>
              <Input
                type="text"
                name="data"
                id="data"
                autoFocus
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
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
          {error.id === "LOGIN_FAIL" && (
            <Alert color="danger p-2 fs-small">{error.msg}</Alert>
          )}
          <Button
            className="btn btn-sm w-100 text-uppercase my-3"
            color="primary"
            disabled={validateForm()}
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

Login.propTypes = {
  title: PropTypes.string,
};

export default Login;
