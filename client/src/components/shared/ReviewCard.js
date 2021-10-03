import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaUserCircle, FaHeart, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { timeSince } from "../../vars";

const ReviewCard = (props) => {
  const { review } = props;
  const { rating, like } = review.author.episodes.find(
    (episode) => episode.episodeId === review.episode.id
  );
  const maxReviewContentLength = 200;

  const [showMore, setShowMore] = useState(false);

  return (
    <Link to={`/review/${review._id}`} className="text-decoration-none">
      <div className="review-card w-100 p-3" title={review.episode.title}>
        <div className="row">
          <div className="col-3">
            <img
              src={review.episode.thumbnail}
              alt=""
              className="review-card-image w-100"
            />
          </div>
          <div className="col-9">
            <h5 className="review-card-title mb-0">{review.episode.title}</h5>
            <div className="review-card-info mt-1">
              <Link className="d-inline text-decoration-none">
                <p className="review-card-author d-inline">
                  <FaUserCircle className="me-1" />
                  {review.author.username}
                </p>
              </Link>
              {rating !== -1 && (
                <div
                  className="row d-inline ms-2"
                  style={{ background: "coral" }}
                >
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
              )}
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
                  className="review-show-more-button bg-transparent"
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
            <div className="review-card-stats">
              <p className="d-inline">
                <FaHeart className="me-1" />
                {review.totalLikes}
              </p>
              <p className="d-inline ms-4">
                <FaComment className="me-1" />
                100
              </p>
              <p className="d-inline float-end mb-0">
                {`${timeSince(new Date(review.date))} ago`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
