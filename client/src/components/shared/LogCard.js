import React from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { MdCached } from "react-icons/md";
import FaCalendar from "../images/FaCalendar.png";
import { Link } from "react-router-dom";
import FiveStarRating from "./FiveStarRating";

const LogCard = (props) => {
  const { log } = props;
  const { rating, like } = log.author.episodes.find(
    (episode) => episode.episodeId === log.episode.id
  );

  return (
    <div className="card w-100 p-3 mb-2 position-relative">
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
            <h5 className="card-title mb-0" title={log.episode.title}>
              {log.episode.title}
            </h5>
          </Link>
          <div className="card-info mt-1">
            <Link
              to={`/${log.author.username}`}
              className="d-inline text-decoration-none me-2"
            >
              <p className="card-author d-inline">
                <FaUserCircle className="me-1" />
                {log.author.username}
              </p>
            </Link>
            {rating && <FiveStarRating rating={rating} />}
            {like && (
              <p className="d-inline ms-2">
                <FaHeart />
              </p>
            )}
            {log.relisten && (
              <p
                className="d-inline ms-2"
                title={`${log.author.username} has relistened this episode`}
              >
                <MdCached />
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
