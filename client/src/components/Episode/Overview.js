import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReviewList from "../shared/ReviewList";
import Details from "../shared/Details";

const Overview = (props) => {
  // Stores the episode object
  const [episode, setEpisode] = useState({ ...props.episode });

  useEffect(() => {
    setEpisode({ ...props.episode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.episode]);

  // Extracts details object out of episode object
  const extractDetails = (episode) => {
    const details = {};

    if (episode.pub_date_ms) {
      details["published"] = new Date(episode.pub_date_ms).toLocaleDateString();
    }

    if (episode.audio_length_sec) {
      details["length"] = `${Math.round(episode.audio_length_sec / 60)} min`;
    }

    if (episode.podcast.language) {
      details["language"] = episode.podcast.language;
    }

    if (episode.podcast.country) {
      details["country"] = episode.podcast.country;
    }

    if (episode.podcast.publisher) {
      details["publisher"] = episode.podcast.publisher;
    }

    return details;
  };

  return (
    <div className="container-md">
      <div className="row mt-5">
        <div className="col-md">
          <div className="reviews-section">
            <h4 className="section-heading text-center mb-0">Reviews</h4>
            <hr className="section-separator mt-1 mb-3" />
            <ReviewList type="episode" id={episode.id} />
          </div>
        </div>
        <div className="col-md">
          <div className="details-section">
            <h4 className="section-heading text-center mb-0">Details</h4>
            <hr className="section-separator mt-1 mb-3" />
            <Details details={extractDetails(episode)} />
          </div>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  episode: PropTypes.object,
};

export default Overview;
