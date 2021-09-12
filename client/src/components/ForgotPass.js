import React, { useState } from "react";
import { Form, Col, FormGroup, Label, Input, Button } from "reactstrap";
import store from "../store";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  //validation function
  const validateForm = () => email.length > 0;

  const handleEmail = (e) => {
    e.preventDefault();
  };
  return (
    <div className="forgot-container">
      <Form className="forgotForm" onSubmit={handleEmail}>
        <FormGroup row>
          <Label for="email">
            Enter the email address associated with your account
          </Label>
          <Col sm={12}>
            <Input
              type="email"
              name="email"
              id="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button
          className="access-btn btn btn-sm text-uppercase my-4"
          color="primary"
          disabled={!validateForm()}
        >
          <strong>Recover your Password</strong>
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPass;
