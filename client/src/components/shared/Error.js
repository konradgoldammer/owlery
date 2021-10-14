import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { titleSuffix } from "../../vars";

const NotFound = (props) => {
  useEffect(() => {
    // Update page title
    document.title = String(props.error.status) + titleSuffix;
  }, [props.error.status]);

  return (
    <div className="pt-56">
      <div className="container-md error-container position-relative mt-5">
        <p className="mb-0">
          {props.error.msg ? props.error.msg : "An error occurred"}
        </p>
        <div className="error-status-code-div" title={props.error.status}>
          <h1 className="error-status-code m-0 text-center">
            {props.error.status}
          </h1>
        </div>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  error: PropTypes.object,
};

export default NotFound;
