import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const PodcastColumn = (props) => {
  const [podcast, setPodcast] = useState(props.podcast);

  useEffect(() => {
    if (!podcast) return;

    if (
      typeof podcast.totalReviews !== "number" ||
      typeof podcast.totalLikes !== "number"
    ) {
      axios.get(`/api/podcasts/stats/${podcast.id}`).then((res) => {
        setPodcast({
          ...podcast,
          totalReviews: res.data.totalReviews,
          totalLikes: res.data.totalLikes,
        });
      });
    }
  }, [podcast]);

  return (
    <div className={`col-md p-0 ${!props.first && "ms-2"}`}>
      {podcast ? (
        <Link to={`/podcast/${podcast.id}`} className="text-decoration-none">
          <div className="podcast-column">
            <img
              className="podcast-column-image"
              src={podcast.thumbnail}
              title={podcast.title}
              alt=""
            />
            <div className="row mt-1">
              <div className="col podcast-column-listeners py-0">
                <p title={`${podcast.totalReviews} Reviews`} className="mb-0">
                  <MdRateReview className="me-2" />
                  {podcast.totalReviews}
                </p>
              </div>
              <div className="col podcast-column-likes">
                <div className="float-end">
                  <p title={`${podcast.totalLikes} Likes`} className="mb-0">
                    <FaHeart className="me-2" />
                    {podcast.totalLikes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

PodcastColumn.propTypes = {
  podcast: PropTypes.object,
  first: PropTypes.bool,
};

export default PodcastColumn;
