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

  const error = useSelector((store) => store.error);

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
      <h2 className="signup-title">owlery</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="email">Email address</Label>
          <Col sm={2}>
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
          <Col sm={2}>
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
          <Col sm={2}>
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
          <Col sm={2}>
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
          <Label check>
            <Input type="checkbox" />I accept the{" "}
            <Link to="">Terms of Use</Link>
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />I accept the{" "}
            <Link to="">Privacy Policy</Link>
          </Label>
        </FormGroup>
        <Button color="warning">Create Account</Button>
        <p>
          Already have an account? <Link to="">Sign In.</Link>
        </p>
      </Form>
      {error.id === "REGISTER_FAIL" && (
        <Alert color="danger">{error.msg}</Alert>
      )}
    </div>
  );
};

export default SignUp;
