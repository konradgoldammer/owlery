import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PodcastColumn from "../shared/PodcastColumn";
import ReviewList from "../shared/ReviewList";
import LogList from "../shared/LogList";

const Overview = (props) => {
  // Stores the user object
  const [user, setUser] = useState({ ...props.user });

  useEffect(() => {
    const newUser = props.user;
    if (newUser.favoritePodcasts.length !== 0) {
      for (let i = newUser.favoritePodcasts.length; i < 5; i++) {
        newUser.favoritePodcasts.push(null);
      }
    }
    setUser(newUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  return (
    <div className="container-md">
      <div className="favorite-podcasts-section">
        <h4 className="section-heading text-center mt-5 mb-0">
          Favorite Podcasts
        </h4>
        <hr className="section-separator mt-1 mb-3" />
        <div className="row m-0">
          {user.favoritePodcasts.length !== 0 ? (
            user.favoritePodcasts.map((favoritePodcast, index) =>
              favoritePodcast ? (
                <PodcastColumn
                  key={favoritePodcast.id}
                  podcast={favoritePodcast}
                  first={index === 0}
                />
              ) : (
                <div
                  key={index}
                  className={`col-md p-0 ${index !== 0 && "ms-2"}`}
                />
              )
            )
          ) : (
            <p className="m-0 p-0">
              <mark className="text-capitalize">{user.username}</mark>
              has not selected any favorite podcasts yet.
            </p>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md">
          <div className="recent-reviews-section">
            <h4 className="section-heading text-center mb-0">Reviews</h4>
            <hr className="section-separator mt-1 mb-3" />
            <ReviewList type="user" id={user._id} />
          </div>
        </div>
        <div className="col-md">
          <div className="recent-logs-section">
            <h4 className="section-heading text-center mb-0">Diary</h4>
            <hr className="section-separator mt-1 mb-3" />
            <LogList id={user._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  user: PropTypes.object,
};

export default Overview;
