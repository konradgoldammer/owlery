import React, { useState } from "react";
import { Form, Col, FormGroup, Label, Input } from "reactstrap";
import store from "../store";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

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
      </Form>
    </div>
  );
};

export default ForgotPass;
