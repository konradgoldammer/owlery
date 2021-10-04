import React from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import FaCalendar from "../images/FaCalendar.png";
import { Link } from "react-router-dom";

const LogCard = (props) => {
  const { log } = props;
  const { rating, like } = log.author.episodes.find(
    (episode) => episode.episodeId === log.episode.id
  );

  return (
    <div
      className="card w-100 p-3 mb-2 position-relative"
      title={log.episode.title}
    >
      <div className="row">
        <div className="col-2 position-relative">
          <img
            src={FaCalendar}
            alt=""
            className="log-card-calendar-image w-100 p-0"
          />
          <p className="log-card-calendar-number fw-bold">
            {new Date(log.date).getDate()}
          </p>
        </div>
        <div className="col-10">
          <Link to={`/review/${log._id}`} className="text-decoration-none">
            <h5 className="card-title mb-0">{log.episode.title}</h5>
          </Link>
          <div className="card-info mt-1">
            <Link
              to={`/${log.author.username}`}
              className="d-inline text-decoration-none"
            >
              <p className="card-author d-inline">
                <FaUserCircle className="me-1" />
                {log.author.username}
              </p>
            </Link>
            {rating !== -1 && (
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
            )}
            {like && (
              <p className="d-inline ms-2">
                <FaHeart />
              </p>
            )}
          </div>
          <div className="card-stats">
            <p className="to-bottom d-inline mb-2 me-2">
              {new Date(log.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

LogCard.propTypes = {
  log: PropTypes.object,
};

export default LogCard;
