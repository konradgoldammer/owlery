import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { useSelector } from "react-redux";
import store from "../../store";
import { updateUser } from "../../actions/authActions";

const EditProfile = () => {
  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const changes = { newLocation: location === "" ? null : location };

    store.dispatch(updateUser(changes));
  };

  const validateForm = () => {
    return location === auth.user.location;
  };

  const [location, setLocation] = useState(auth.user.location);

  return (
    <div className="edit-profile mb-5 mt-1">
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="location">Location</Label>
          <div className="col-12">
            <Input
              type="text"
              name="location"
              id="location"
              autoFocus
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </FormGroup>
        {error.id === "USER_UPDATE_ERROR" && (
          <Alert color="danger p-2 error-msg-alert">{error.msg}</Alert>
        )}
        <Button
          className="btn btn-sm w-100 text-uppercase mt-2"
          color="primary"
          disabled={validateForm()}
        >
          <strong>Update profile</strong>
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
