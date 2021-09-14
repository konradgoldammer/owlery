import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new user object
    const newUser = { username, email, password };

    store.dispatch(register(newUser));

    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
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
          <FormGroup row className="mt-2 mb-4">
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
          <FormGroup check className="mb-1">
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
          <FormGroup check className="mt-1">
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
          {error.id === "REGISTER_FAIL" && (
            <Alert color="danger my-3">{error.msg}</Alert>
          )}
          <Button
            className="access-btn btn btn-sm text-uppercase my-4"
            color="primary"
          >
            <strong>Create Account</strong>
          </Button>
          <p className="choose-other-access-option my-1">
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
