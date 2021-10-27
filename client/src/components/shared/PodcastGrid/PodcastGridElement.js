import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import defaultPodcastThumbnail from "../../images/defaultPodcastThumbnail.jpg";
import FiveStarRating from "../FiveStarRating";

const PodcastGridElement = (props) => {
  const [hover, setHover] = useState(false);

  const episode = props.episode.episode
    ? { ...props.episode.episode }
    : { ...props.episode };

  const { like, rating } = props.episode;

  const maxEpisodeTitleLength = 70;

  return (
    episode && (
      <div className="podcast-grid-element fc-secondary-text">
        <div
          className="podcast-grid-element-upper-section w-100"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <Link to={`/episode/${episode.id}`}>
            <img
              src={episode.thumbnail}
              onError={(e) => (e.target.src = defaultPodcastThumbnail)}
              alt="episode thumbnail"
              title={episode.title}
              className={`podcast-grid-element-img w-100 h-100 ${
                hover ? "opacity-50" : "opacity-100"
              }`}
            />
            <p
              className={`podcast-grid-element-title m-2 text-decoration-none text-light ${
                hover ? "visible" : "invisible h-0"
              }`}
            >
              {episode.title.length > maxEpisodeTitleLength
                ? `${episode.title.substring(0, maxEpisodeTitleLength)}...`
                : episode.title}
            </p>
          </Link>
        </div>
        <div className="podcast-grid-element-lower-section w-100">
          {rating && <FiveStarRating rating={rating} />}
          {like && (
            <p className="float-end d-inline">
              <FaHeart />
            </p>
          )}
        </div>
      </div>
    )
  );
};

PodcastGridElement.propTypes = {
  episode: PropTypes.object,
};

export default PodcastGridElement;
