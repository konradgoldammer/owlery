import React from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const FiveStarRating = ({ rating }) => {
  return (
    rating &&
    rating !== -1 && (
      <div className="row d-inline ms-2">
        <div className="col d-inline p-0">
          {rating <= 0 ? (
            <BsStar />
          ) : rating === 1 ? (
            <BsStarHalf />
          ) : (
            <BsStarFill />
          )}
          {rating <= 2 ? (
            <BsStar />
          ) : rating === 3 ? (
            <BsStarHalf />
          ) : (
            <BsStarFill />
          )}
          {rating <= 4 ? (
            <BsStar />
          ) : rating === 5 ? (
            <BsStarHalf />
          ) : (
            <BsStarFill />
          )}
          {rating <= 6 ? (
            <BsStar />
          ) : rating === 7 ? (
            <BsStarHalf />
          ) : (
            <BsStarFill />
          )}
          {rating <= 8 ? (
            <BsStar />
          ) : rating === 9 ? (
            <BsStarHalf />
          ) : (
            <BsStarFill />
          )}
        </div>
      </div>
    )
  );
};

FiveStarRating.propTypes = {
  rating: PropTypes.number,
};

export default FiveStarRating;
