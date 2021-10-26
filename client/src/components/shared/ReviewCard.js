import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaUserCircle, FaHeart, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { timeSince } from "../../vars";
import FiveStarRating from "./FiveStarRating";

const ReviewCard = (props) => {
  const { review } = props;
  const { rating, like } = review.author.episodes.find(
    (episode) => episode.episodeId === review.episode.id
  );
  const maxReviewContentLength = 200;

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="card w-100 p-3 mb-2" title={review.episode.title}>
      <div className="row">
        <div className="col-3">
          <img
            src={review.episode.thumbnail}
            alt=""
            className="review-card-image w-100"
          />
        </div>
        <div className="col-9">
          <Link to={`/review/${review._id}`} className="text-decoration-none">
            <h5 className="card-title mb-0">{review.episode.title}</h5>
          </Link>
          <div className="review-card-info mt-1">
            <Link
              className="d-inline text-decoration-none"
              to={`/${review.author.username}`}
            >
              <p className="card-author d-inline">
                <FaUserCircle className="me-1" />
                {review.author.username}
              </p>
            </Link>
            <FiveStarRating rating={rating} />
            {like && (
              <p className="d-inline ms-2">
                <FaHeart />
              </p>
            )}
          </div>
          <p className="mt-2 review-card-content">
            {showMore
              ? review.content
              : review.content.substring(0, maxReviewContentLength)}
            {review.content.length > maxReviewContentLength &&
              !showMore &&
              "..."}
            {review.content.length > maxReviewContentLength && (
              <button
                className="text-secondary hover-underline bg-transparent"
                title={showMore ? "show less" : "show more"}
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "show less" : "show more"}
              </button>
            )}
          </p>
          <div className="card-stats">
            <p className="d-inline">
              <FaHeart className="me-1" />
              {review.likers.length}
            </p>
            <p className="d-inline ms-4">
              <FaComment className="me-1" />
              {review.totalComments}
            </p>
            <p className="d-inline float-end mb-0">
              {`${timeSince(new Date(review.date))} ago`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
