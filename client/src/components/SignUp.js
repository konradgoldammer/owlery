import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { register } from "../actions/authActions";
import { returnErrors, clearErrors } from "../actions/errorActions";
import { useSelector } from "react-redux";
import SmallFooter from "./subcomponents/SmallFooter";
import store from "../store";
import "../App.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  // Remove errors on page load
  useEffect(() => {
    store.dispatch(clearErrors());
  }, []);

  // Validation function
  const validateForm = () => {
    return (
      email.length === 0 ||
      username.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and password confirmation match
    if (password !== confirmPassword) {
      return store.dispatch(
        returnErrors(
          "Password and the password confirmation do not match",
          400,
          "REGISTER_FAIL"
        )
      );
    }

    // Create new user object
    const newUser = { username, email, password };

    store.dispatch(register(newUser));
  };

  return (
    <div className="access-container">
      <Form className="access-form" onSubmit={handleSubmit}>
        <h2 className="access-title text-center text-lowercase">Owlery</h2>
        <div className="inside-access-form">
          <FormGroup row className="mb-2 mt-4">
            <Label for="email">Email address</Label>
            <Col sm={12}>
              <Input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="my-2">
            <Label for="username">Username</Label>
            <Col sm={12}>
              <Input
                type="text"
                name="user"
                id="user"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="my-2">
            <Label for="password">Password</Label>
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
          <FormGroup row className="mt-2 mb-1">
            <Label for="confirmPassword">Confirm password</Label>
            <Col sm={12}>
              <Input
                type="password"
                name="confirmPass"
                id="confirmPass"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </FormGroup>
          {error.id === "REGISTER_FAIL" && (
            <Alert color="danger p-2 error-msg-alert">{error.msg}</Alert>
          )}
          <FormGroup check className="mt-3">
            <Label check for="chk">
              <Input type="checkbox" required />I accept the{" "}
              <Link
                to="/terms"
                className="text-secondary link-secondary text-decoration-none"
              >
                Terms of Use.
              </Link>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check for="chk">
              <Input type="checkbox" required />I accept the{" "}
              <Link
                to="/privacy"
                className="text-secondary link-secondary text-decoration-none"
              >
                Privacy Policy.
              </Link>
            </Label>
          </FormGroup>
          <Button
            className="access-btn btn btn-sm text-uppercase my-3"
            color="primary"
            disabled={validateForm()}
          >
            <strong>Create Account</strong>
          </Button>
          <p className="choose-other-access-option">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-secondary link-secondary text-decoration-none"
            >
              Sign In.
            </Link>
          </p>
        </div>
      </Form>
      <SmallFooter />
      {auth.isAuthenticated && <Redirect to="/" />}
    </div>
  );
};

export default SignUp;
