import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch()
  };

  const handleChange = (e) => {
    //catch values
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="email">Email address</Label>
          <Col sm={2}>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="username">Username</Label>
          <Col sm={2}>
            <Input type="text" name="user" id="user" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password">Password</Label>
          <Col sm={2}>
            <Input type="password" name="password" id="password" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="confirmPassword">Confirm password</Label>
          <Col sm={2}>
            <Input type="password" name="confirmPass" id="confirmPass" />
          </Col>
        </FormGroup>
        <Button color="warning">Create Account</Button>
      </Form>
    </div>
  );
};

export default SignUp;
