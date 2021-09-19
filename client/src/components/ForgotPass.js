import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Col, FormGroup, Label, Input, Button } from "reactstrap";

const ForgotPass = (props) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  //validation function
  const validateForm = () => email.length > 0;

  const handleEmail = (e) => {
    e.preventDefault();
  };

  return (
    <div className="forgot-container">
      <Form className="forgot-form" onSubmit={handleEmail}>
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

ForgotPass.propTypes = {
  title: PropTypes.string,
};

export default ForgotPass;
