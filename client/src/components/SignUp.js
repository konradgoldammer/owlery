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
  const initialState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [email, setEmail] = useState(initialState.email);
  const [username, setUsername] = useState(initialState.username);
  const [password, setPassword] = useState(initialState.password);
  const [confirmPassword, setConfirmPassword] = useState(
    initialState.confirmPassword
  );

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  // Email validation
  const validateEmail = (email) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setEmailError("'Email' field cannot be empty");
      return true;
    }

    if (email.length > 50) {
      setEmailError("Your email cannot be longer than 50 characters");
      return true;
    }

    if (!email.match(regexEmail)) {
      setEmailError("Please enter a valid email");
      return true;
    }

    return false;
  };

  // Username validation
  const validateUsername = (username) => {
    const regexUsername = /^(\w|\.|-)+$/;

    if (!username) {
      setUsernameError("'Username' field cannot be empty");
      return true;
    }

    if (username.length < 3) {
      setUsernameError("Your username has to have at least 3 characters");
      return true;
    }

    if (username.length > 30) {
      setUsernameError("Your username cannot be longer than 30 characters");
      return true;
    }

    if (!username.match(regexUsername)) {
      setUsernameError(
        "Your username can only include letters, numbers, dots, underscores or dashes"
      );
      return true;
    }

    if (username.toUpperCase() === username.toLowerCase()) {
      setUsernameError("Your username has to include at least 1 letter");
      return true;
    }

    return false;
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("'Password' field cannot be empty");
      return true;
    }

    if (password.length < 6) {
      setPasswordError("Your password has to have at least 6 characters");
      return true;
    }

    if (password.length > 50) {
      setPasswordError("Your password cannot be longer than 50 characters");
      return true;
    }

    return false;
  };

  // Confirm password validation
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      setConfirmPasswordError("'Confirm password' field cannot be empty");
      return true;
    }

    // Check if password and password confirmation match
    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "'Confirm password' field does not match with the 'Password' field"
      );
      return true;
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailIsInvalid = validateEmail(email);

    // Validate username
    const usernameIsInvalid = validateUsername(username);

    // Validate password
    const passwordIsInvalid = validatePassword(password);

    // Validate confirm password
    const confirmPasswordIsInvalid = validateConfirmPassword(
      confirmPassword,
      password
    );

    // Clear errors
    store.dispatch(clearErrors());

    if (
      emailIsInvalid ||
      usernameIsInvalid ||
      passwordIsInvalid ||
      confirmPasswordIsInvalid
    ) {
      return;
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
                className={emailError && "input-error"}
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
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
                className={usernameError && "input-error"}
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
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
                className={passwordError && "input-error"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
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
                className={confirmPasswordError && "input-error"}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
              />
            </Col>
          </FormGroup>
          {error.id === "REGISTER_FAIL" && (
            <Alert color="danger" className="p-2 mt-1 mb-0 error-msg-alert">
              {error.msg}
            </Alert>
          )}
          {emailError && (
            <Alert color="danger" className="p-2 mt-1 mb-0 error-msg-alert">
              {emailError}
            </Alert>
          )}
          {usernameError && (
            <Alert color="danger" className="p-2 mt-1 mb-0 error-msg-alert">
              {usernameError}
            </Alert>
          )}
          {passwordError && (
            <Alert color="danger" className="p-2 mt-1 mb-0 error-msg-alert">
              {passwordError}
            </Alert>
          )}
          {confirmPasswordError && (
            <Alert color="danger" className="p-2 mt-1 mb-0 error-msg-alert">
              {confirmPasswordError}
            </Alert>
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
