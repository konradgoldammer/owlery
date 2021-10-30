import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button } from "reactstrap";
import PodcastColumn from "../shared/PodcastColumn";
import ReviewList from "../shared/ReviewList";
import LogCard from "../shared/LogCard";
import loading1 from "../images/loading1.gif";
import axios from "axios";

const Overview = (props) => {
  const [user, setUser] = useState({ ...props.user });
  const [recentLogs, setRecentLogs] = useState([]);
  const [recentLogsSkip, setRecentLogsSkip] = useState(0);
  const [showRecentLogsShowMore, setShowRecentLogsShowMore] = useState(true);
  const [isLoadingRecentLogs, setIsLoadingRecentLogs] = useState(false);
  const [recentLogsFetchError, setRecentLogsFetchError] = useState(null);

  useEffect(() => {
    const newUser = props.user;
    if (newUser.favoritePodcasts.length !== 0) {
      for (let i = newUser.favoritePodcasts.length; i < 5; i++) {
        newUser.favoritePodcasts.push(null);
      }
    }
    if (user._id !== newUser._id) {
      // Reset recent logs
      setRecentLogs([]);

      // Reset Skips
      setRecentLogsSkip(0);

      // Reset visibility of 'load more' buttons
      setShowRecentLogsShowMore(true);
    }
    setUser(newUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  useEffect(() => {
    // Reset fetch recent reviews error
    setRecentLogsFetchError(null);

    // Fetch recent logs
    setIsLoadingRecentLogs(true);

    axios
      .get(`/api/reviews/user/logs/${user._id}?skip=${recentLogsSkip}`)
      .then((res) => {
        setIsLoadingRecentLogs(false);

        if (res.data.length === 0) {
          setShowRecentLogsShowMore(false);
          return;
        }
        setRecentLogs([...recentLogs, ...res.data]);
      })
      .catch((err) => {
        setIsLoadingRecentLogs(false);
        setRecentLogsFetchError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentLogsSkip, user._id]);

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
            {recentLogs.map((recentLog) => (
              <LogCard key={recentLog._id} log={recentLog} />
            ))}
            {recentLogs.length === 0 &&
              !recentLogsFetchError &&
              !isLoadingRecentLogs && (
                <p className="m-0 p-0">
                  <mark className="text-capitalize">{user.username}</mark>
                  has not logged any episodes yet.
                </p>
              )}
            {isLoadingRecentLogs && (
              <div className="w-100">
                <img
                  src={loading1}
                  alt="loading..."
                  title="loading..."
                  className="text-center d-block mx-auto loading-gif"
                />
              </div>
            )}
            {recentLogsFetchError && (
              <Alert color="danger fs-small">{`${recentLogsFetchError.status} ${
                recentLogsFetchError.msg
                  ? recentLogsFetchError.msg
                  : "An error occurred while loading recent reviews"
              }`}</Alert>
            )}
            {showRecentLogsShowMore &&
              !recentLogsFetchError &&
              !isLoadingRecentLogs && (
                <Button
                  className="w-100 btn btn-sm text-uppercase"
                  color="dark"
                  onClick={() => setRecentLogsSkip(recentLogsSkip + 3)}
                >
                  <strong>load more...</strong>
                </Button>
              )}
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
