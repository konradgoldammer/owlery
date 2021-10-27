import React, { useState } from "react";
import PropTypes from "prop-types";
import defaultProfilePicture from "../../images/defaultProfilePicture.jpg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { MdHeadset } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import store from "../../../store";
import { followUser, unfollowUser } from "../../../actions/authActions";

const UserCard = (props) => {
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState(props.user);

  // Is true when follow button should be disabled
  const validateFollow = () => {
    return (
      auth.isUpdatingUser ||
      !user ||
      !auth.user ||
      !auth.isAuthenticated ||
      user._id === auth.user._id
    );
  };

  // Is false for follow and true for unfollow
  const followOrUnfollow = () => {
    if (!user || !auth.user) {
      return false;
    }
    return auth.user.following.find((following) => following === user._id);
  };

  // Follow/Unfollow user
  const handleFollow = () => {
    if (followOrUnfollow()) {
      store.dispatch(unfollowUser(user._id));
      setUser({
        ...user,
        followers: user.followers.filter(
          (follower) => follower !== auth.user._id
        ),
      });
    } else {
      store.dispatch(followUser(user._id));
      setUser({
        ...user,
        followers: [...user.followers, auth.user._id],
      });
    }
  };

  return (
    <div className="card w-100 p-2 mb-2">
      <div className="row">
        <div className="col-md-8 d-flex">
          <img
            src={defaultProfilePicture}
            alt="profilepicture"
            className="user-list-profile-pic"
          />
          <div>
            <div className="ms-2 center-vertically">
              <Link to={`/${user.username}`} className="text-decoration-none">
                <h5 className="card-title mb-0">{user.username}</h5>
              </Link>
              <p className="m-0 fc-secondary-text">
                {user.followers.length} followers
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-1 position-relative">
          <div className="center">
            <h5
              className="fs-big m-0"
              title={`${user.episodes.length} episodes`}
            >
              {user.episodes.length} <MdHeadset />
            </h5>
          </div>
        </div>
        <div className="col-md-1 position-relative">
          <div className="center">
            <h5
              className="fs-big m-0"
              title={`${user.likedPodcasts.length} liked podcasts`}
            >
              {user.likedPodcasts.length} <FaHeart />
            </h5>
          </div>
        </div>
        <div className="col-md-2 position-relative">
          <Button
            className="btn btn-sm text-uppercase px-5 center"
            color="primary"
            onClick={handleFollow}
            disabled={validateFollow()}
          >
            <strong>{followOrUnfollow() ? "Unfollow" : "Follow"}</strong>
          </Button>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
