import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import PodcastColumn from "../shared/PodcastColumn";
import ReviewCard from "../shared/ReviewCard";
import LogCard from "../shared/LogCard";
import axios from "axios";

const Overview = (props) => {
  const [user, setUser] = useState(props.user);
  const [recentReviews, setRecentReviews] = useState([]);
  const [recentReviewsSkip, setRecentReviewsSkip] = useState(0);
  const [showRecentReviewsShowMore, setShowRecentReviewsShowMore] =
    useState(true);
  const [recentLogs, setRecentLogs] = useState([]);
  const [recentLogsSkip, setRecentLogsSkip] = useState(0);
  const [showRecentLogsShowMore, setShowRecentLogsShowMore] = useState(true);

  useEffect(() => {
    const newUser = props.user;
    if (newUser.favoritePodcasts.length !== 0) {
      for (let i = newUser.favoritePodcasts.length; i < 5; i++) {
        newUser.favoritePodcasts.push(null);
      }
    }
    if (user._id !== newUser._id) {
      setRecentReviews([]);
      setRecentLogs([]);
    }
    setUser(newUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  useEffect(() => {
    // Fetch recent reviews
    axios
      .get(`/api/reviews/user/${user._id}?skip=${recentReviewsSkip}`)
      .then((res) => {
        if (res.data.length === 0) {
          setShowRecentReviewsShowMore(false);
          return;
        }
        setRecentReviews([...recentReviews, ...res.data]);
      })
      .catch((err) => {
        // TODO: Handle error

        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentReviewsSkip, user._id]);

  useEffect(() => {
    // Fetch recent logs
    axios
      .get(`/api/reviews/user/logs/${user._id}?skip=${recentLogsSkip}`)
      .then((res) => {
        if (res.data.length === 0) {
          setShowRecentLogsShowMore(false);
          return;
        }
        setRecentLogs([...recentLogs, ...res.data]);
      })
      .catch((err) => {
        // TODO: Handle error

        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentLogsSkip, user._id]);

  return (
    <div className="container-md">
      <div className="favorite-podcasts-section">
        <h4 className="section-heading txt-center mt-5 mb-0">
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
            <h4 className="section-heading txt-center mb-0">Recent Reviews</h4>
            <hr className="section-separator mt-1 mb-3" />
            {recentReviews.map((recentReview) => (
              <ReviewCard key={recentReview._id} review={recentReview} />
            ))}
            {showRecentReviewsShowMore && (
              <Button
                className="w-100 btn btn-sm text-uppercase"
                color="dark"
                onClick={() => setRecentReviewsSkip(recentReviewsSkip + 5)}
              >
                <strong>load more...</strong>
              </Button>
            )}
            {recentReviews.length === 0 && (
              <p className="m-0 p-0">
                <mark className="text-capitalize">{user.username}</mark>
                has not posted any reviews yet.
              </p>
            )}
          </div>
        </div>
        <div className="col-md">
          <div className="recent-logs-section">
            <h4 className="section-heading txt-center mb-0">Diary</h4>
            <hr className="section-separator mt-1 mb-3" />
            {recentLogs.map((recentLog) => (
              <LogCard key={recentLog._id} log={recentLog} />
            ))}
            {showRecentLogsShowMore && (
              <Button
                className="w-100 btn btn-sm text-uppercase"
                color="dark"
                onClick={() => setRecentLogsSkip(recentLogsSkip + 5)}
              >
                <strong>load more...</strong>
              </Button>
            )}
            {recentLogs.length === 0 && (
              <p className="m-0 p-0">
                <mark className="text-capitalize">{user.username}</mark>
                has not logged any episodes yet.
              </p>
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
