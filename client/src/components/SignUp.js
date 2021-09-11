import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { register } from "../actions/authActions";
import { useSelector } from "react-redux";
import store from "../store";
import "../App.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const error = useSelector((state) => state.error);

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
    <div className="signup-container">
      <Form className="signUpForm" onSubmit={handleSubmit}>
        <h2 className="signUpTitle text-center text-lowercase">Owlery</h2>
        <div className="insideSignUpForm">
          <FormGroup row>
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
          <FormGroup row>
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
          <FormGroup row>
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
          <FormGroup row>
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
          <FormGroup check>
            <Label check for="chk">
              <Input type="checkbox" />I accept the{" "}
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
              <Input type="checkbox" />I accept the{" "}
              <Link
                to="/privacy"
                className="text-secondary link-secondary text-decoration-none"
              >
                Privacy Policy.
              </Link>
            </Label>
          </FormGroup>
          <Button
            className="signupBtn btn btn-sm text-uppercase"
            color="primary"
          >
            <strong>Create Account</strong>
          </Button>
          <p className="createAccount">
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
      <div className="smallFooter my-4">
        <div className="row text-center">
          <div className="col-sm">
            <Link
              to="/terms"
              className="text-decoration-none text-secondary-text-color"
            >
              Terms
            </Link>
          </div>
          <div className="col-sm">
            <Link
              to="/privacy"
              className="text-decoration-none text-secondary-text-color"
            >
              Privacy
            </Link>
          </div>
          <div className="col-sm">
            <Link
              to="#"
              className="text-decoration-none text-secondary-text-color"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      {error.id === "REGISTER_FAIL" && (
        <Alert color="danger">{error.msg}</Alert>
      )}
    </div>
  );
};

export default SignUp;
