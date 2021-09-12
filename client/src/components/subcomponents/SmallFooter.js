import React from "react";
import { Link } from "react-router-dom";

const SmallFooter = () => {
  return (
    <div className="small-footer my-4">
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
  );
};

export default SmallFooter;
