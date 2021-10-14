import React from "react";
import PropTypes from "prop-types";
import store from "../../store";
import MainNavbar from "../shared/MainNavbar";
import MainFooter from "../shared/MainFooter";
import loading from "../images/loading.gif";
import defaultProfilePicture from "../images/defaultProfilePicture.jpg";
import { Button } from "reactstrap";
import { FaMapMarkerAlt, FaCalendarAlt, FaPen, FaLink } from "react-icons/fa";
import Overview from "./Overview";
import Podcasts from "./Podcasts";
import Diary from "./Diary";
import Reviews from "./Reviews";
import Lists from "./Lists";
import Likes from "./Likes";
import Followers from "./Followers";
import Following from "./Following";
import EditProfile from "./EditProfile";
import Error from "../shared/Error";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { titleSuffix } from "../../vars";
import { useSelector } from "react-redux";
import axios from "axios";
import { clearErrors } from "../../actions/errorActions";

const Profile = (props) => {
  const { username } = useParams();

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  // Stores the user oject
  const [user, setUser] = useState(undefined);

  // Stores the subpage that the user is on
  const [subpage, setSubpage] = useState("overview");

  // Stores whether or whether not the edit profile form should be shown
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Stores whether or whether not the user data is loading
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // Stores the potential error that occurres when trying to fetch the user object
  const [fetchUserError, setFetchUserError] = useState(null);

  useEffect(() => {
    if (!auth.user) {
      return;
    }
    if (!auth.user.isUpdatingUser) {
      setShowEditProfile(false);

      if (error.id === "USER_UPDATE_ERROR") {
        store.dispatch(clearErrors());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  useEffect(() => {
    // Set page title
    document.title = props.title;

    // Reset error
    setFetchUserError(null);

    // Fetch user
    setIsLoadingUser(true);

    axios
      .get(`/api/users/${username}`)
      .then((res) => {
        setIsLoadingUser(false);
        setUser(res.data);

        // Update page title
        document.title = res.data.username + titleSuffix;
      })
      .catch((err) => {
        setIsLoadingUser(false);
        setFetchUserError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
  }, [props.title, username, auth.user]);

  // Is true when follow button should be disabled
  const validateFollow = () => {
    if (!user || !auth.user) {
      return true;
    }
    return !auth.isAuthenticated || user._id === auth.user._id;
  };

  // Is false for follow and true for unfollow
  const followOrUnfollow = () => {
    if (!user || !auth.user) {
      return false;
    }
    return user.followers.find((follower) => follower === auth.user._id);
  };

  // Follow/Unfollow user
  const handleFollow = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": auth.token,
      },
    };

    if (followOrUnfollow()) {
      return axios
        .put("/api/users/unfollow", { userId: user._id }, config)
        .then((res) => {
          setUser({
            ...user,
            followers: user.followers.filter(
              (follower) => follower !== auth.user._id
            ),
          });
        })
        .catch((err) => console.log(err));
    } else {
      return axios
        .put("/api/users/follow", { userId: user._id }, config)
        .then((res) => {
          setUser({ ...user, followers: [...user.followers, auth.user._id] });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="content">
      <div className="bg-main pb-5">
        <MainNavbar />
        {!fetchUserError ? (
          <div>
            <div className="profile-header w-100 pt-56">
              <div className="container-md">
                <div className="row mt-2">
                  <div className="col-md-8">
                    <div className="profile-header-info">
                      {!isLoadingUser ? (
                        user && (
                          <img
                            src={defaultProfilePicture}
                            alt="profilepicture"
                            className="profile-pic mb-3"
                          />
                        )
                      ) : (
                        <img
                          src={loading}
                          alt="loading..."
                          title="loading..."
                          className="profile-pic mb-3"
                        />
                      )}
                      <div className="ms-4 w-100 position-relative fs-0">
                        <h3 className="profile-name">
                          {!isLoadingUser
                            ? user && user.username
                            : "loading..."}
                        </h3>
                        {user && user.location && !showEditProfile && (
                          <p className="profile-header-info-element m-0">
                            <FaMapMarkerAlt className="me-2" />
                            {user.location}
                          </p>
                        )}
                        {user && !showEditProfile && (
                          <p className="profile-header-info-element m-0">
                            <FaCalendarAlt className="me-2" />
                            {`Member since ${new Date(
                              user.date
                            ).toLocaleDateString()}`}
                          </p>
                        )}
                        {user && user.website && !showEditProfile && (
                          <p className="profile-header-info-element m-0">
                            <FaLink className="me-2" />
                            <a
                              href={user.website}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="profile-header-info-link"
                            >
                              {user.website}
                            </a>
                          </p>
                        )}
                        {user && auth.user && user._id === auth.user._id && (
                          <button
                            className={`profile-header-info-button bg-transparent hover-underline p-0 ${
                              showEditProfile ? "text-danger" : "text-secondary"
                            }`}
                            onClick={() => {
                              if (showEditProfile) {
                                store.dispatch(clearErrors());
                              }
                              setShowEditProfile(!showEditProfile);
                            }}
                          >
                            <FaPen className="me-2" />
                            {showEditProfile ? "Close" : "Edit profile"}
                          </button>
                        )}
                        {showEditProfile && <EditProfile />}
                        {!showEditProfile && user && (
                          <Button
                            className="btn btn-sm text-uppercase mt-2 px-5 mb-5 d-block"
                            color="primary"
                            onClick={handleFollow}
                            disabled={validateFollow()}
                          >
                            <strong>
                              {followOrUnfollow() ? "Unfollow" : "Follow"}
                            </strong>
                          </Button>
                        )}
                        <div className="profile-header-nav row w-100 m-0">
                          <button
                            onClick={() => setSubpage("overview")}
                            className={`profile-header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "overview"
                                ? "profile-header-nav-selected"
                                : "profile-header-nav-unselected"
                            }`}
                          >
                            Overview
                          </button>
                          <button
                            onClick={() => setSubpage("podcasts")}
                            className={`profile-header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "podcasts"
                                ? "profile-header-nav-selected"
                                : "profile-header-nav-unselected"
                            }`}
                          >
                            Podcasts
                          </button>
                          <button
                            onClick={() => setSubpage("diary")}
                            className={`profile-header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "diary"
                                ? "profile-header-nav-selected"
                                : "profile-header-nav-unselected"
                            }`}
                          >
                            Diary
                          </button>
                          <button
                            onClick={() => setSubpage("reviews")}
                            className={`profile-header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "reviews"
                                ? "profile-header-nav-selected"
                                : "profile-header-nav-unselected"
                            }`}
                          >
                            Reviews
                          </button>
                          <button
                            onClick={() => setSubpage("lists")}
                            className={`profile-header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "lists"
                                ? "profile-header-nav-selected"
                                : "profile-header-nav-unselected"
                            }`}
                          >
                            Lists
                          </button>
                          <button
                            onClick={() => setSubpage("likes")}
                            className={`profile-header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "likes"
                                ? "profile-header-nav-selected"
                                : "profile-header-nav-unselected"
                            }`}
                          >
                            Likes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 position-relative">
                    {user && (
                      <div className="profile-header-numbers">
                        <button
                          className="profile-header-numbers-element px-2"
                          onClick={() => setSubpage("podcasts")}
                        >
                          <h3 className="text-center m-0">
                            {user.episodes ? user.episodes.length : "0"}
                          </h3>
                          <p className="profile-header-numbers-text-bottom txt-center m-0">
                            Podcasts
                          </p>
                        </button>
                        <button
                          className="profile-header-numbers-element px-2"
                          onClick={() => setSubpage("followers")}
                        >
                          <h3 className="text-center m-0">
                            {user.followers ? user.followers.length : "0"}
                          </h3>
                          <p className="profile-header-numbers-text-bottom txt-center m-0">
                            Followers
                          </p>
                        </button>
                        <button
                          className="profile-header-numbers-element px-2"
                          onClick={() => setSubpage("following")}
                        >
                          <h3 className="text-center m-0">
                            {user.following ? user.following.length : "0"}
                          </h3>
                          <p className="profile-header-numbers-text-bottom txt-center m-0">
                            Following
                          </p>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {subpage === "overview" && user && <Overview user={user} />}
            {subpage === "podcasts" && <Podcasts />}
            {subpage === "diary" && <Diary />}
            {subpage === "reviews" && <Reviews />}
            {subpage === "lists" && <Lists />}
            {subpage === "likes" && <Likes />}
            {subpage === "followers" && <Followers />}
            {subpage === "following" && <Following />}
          </div>
        ) : (
          <Error error={fetchUserError} />
        )}
      </div>
      <MainFooter />
    </div>
  );
};

Profile.propTypes = {
  title: PropTypes.string,
};

export default Profile;
