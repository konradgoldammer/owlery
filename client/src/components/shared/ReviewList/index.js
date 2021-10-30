import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReviewCard from "./ReviewCard";
import { Alert, Button } from "reactstrap";
import loading1 from "../../images/loading1.gif";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const ReviewList = ({ id, type }) => {
  // Stores the reviews array
  const [reviews, setReviews] = useState([]);

  // Stores the amount of reviews to skip on next load
  const [skip, setSkip] = useState(0);

  // Is true if more reviews can theoretically be loaded
  const [loadMore, setLoadMore] = useState(true);

  // Is true if more reviews are being loaded atm
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Is storing potential error that occurred on fetching reviews
  const [reviewsFetchError, setReviewsFetchError] = useState(null);

  // Default Configs
  const defaultConfigs = { sortBy: 0 };

  // Reset all configs
  const resetConfigs = () => {
    setSortBy(defaultConfigs.sortBy);
    return;
  };

  // If 0: sort by date; If 1: sort by popularity
  const [sortBy, setSortBy] = useState(defaultConfigs.sortBy);

  // Options to sort the reviews by
  const sortOptions = ["date (latest first)", "popularity"];

  useEffect(() => {
    // Rest reviews
    setReviews([]);

    // Reset skip
    setSkip(0);

    // Reset loadMore
    setLoadMore(true);
  }, [id, sortBy, type]);

  useEffect(() => {
    // Reset fetch error
    setReviewsFetchError(null);

    // Fetch reviews
    setIsLoadingReviews(true);

    axios
      .get(
        `/api/reviews${type === "user" ? "/user" : null}${
          id ? `/${id}` : null
        }/?skip=${skip}&sortByPopularity=${sortBy === 1}`
      )
      .then((res) => {
        setIsLoadingReviews(false);

        if (res.data.length === 0) {
          return setLoadMore(false);
        }

        // Add newly fetched reviews to state
        setReviews((reviews) => [...reviews, ...res.data]);
      })
      .catch((err) => {
        setIsLoadingReviews(false);

        setReviewsFetchError({
          status: err.response.status,
          msg: err.response.msg,
        });
      });
  }, [skip, sortBy, type, id]);

  return (
    <div className="review-list">
      {!reviewsFetchError ? (
        isLoadingReviews ? (
          <div className="w-100">
            <img
              src={loading1}
              alt="loading..."
              title="loading..."
              className="text-center d-block mx-auto loading-gif"
            />
          </div>
        ) : reviews.length === 0 ? (
          <p className="m-0 p-0">Could not find any reviews</p>
        ) : (
          <>
            <div className="card mb-2 py-1 px-3">
              <div className="row">
                <div className="col-md-10 d-flex">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-dark text-start dropdown-toggle py-0 px-1 white-space-normal"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                      <mark className="mark-secondary">
                        {sortOptions[sortBy]}
                      </mark>
                    </button>
                    <div className="dropdown-menu dropdown-dark">
                      {sortOptions.map((option, index) => (
                        <button
                          className={`dropdown-item text-center ${
                            sortBy === index ? "invisible h-0 p-0" : null
                          }`}
                          key={index}
                          onClick={() => setSortBy(index)}
                        >
                          {sortOptions[index]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  {sortBy !== defaultConfigs.sortBy && (
                    <button
                      type="button"
                      className="btn btn-dark py-0 px-1 float-end text-danger"
                      title="Reset to default"
                      onClick={() => resetConfigs()}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}

            {loadMore && (
              <Button
                className="w-100 btn btn-sm text-uppercase"
                color="dark"
                onClick={() => setSkip((skip) => skip + 3)}
              >
                <strong>load more...</strong>
              </Button>
            )}
          </>
        )
      ) : (
        <Alert color="danger fs-small">
          `${reviewsFetchError.status} $
          {reviewsFetchError.msg
            ? reviewsFetchError.msg
            : "An error occurred while loading the reviews (try reloading the page)"}
          `
        </Alert>
      )}
    </div>
  );
};

ReviewList.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

export default ReviewList;
