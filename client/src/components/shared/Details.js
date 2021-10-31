import React from "react";
import PropTypes from "prop-types";

const Details = ({ details }) => {
  return (
    <div className="card py-1 px-3">
      {Object.keys(details).map((key, index) => (
        <div className="fs-medium" key={index}>
          <p className="text-capitalize fc-secondary-text m-0 d-inline">
            {key}
          </p>
          <div className="text-capitalize m-0 d-inline float-end">
            {details[key]}
          </div>
        </div>
      ))}
    </div>
  );
};

Details.propTypes = {
  details: PropTypes.object.isRequired,
};

export default Details;
