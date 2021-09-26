import React from "react";
import PropTypes from "prop-types";
import MainNavbar from "../shared/MainNavbar";
import profilePic from "../images/profile.png";
import { Button } from "reactstrap";
import Overview from "./Overview";
import Podcasts from "./Podcasts";
import Diary from "./Diary";
import Reviews from "./Reviews";
import Lists from "./Lists";
import Likes from "./Likes";
import Followers from "./Followers";
import Following from "./Following";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { titleSuffix } from "../../vars";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = (props) => {
  const { username } = useParams();

  const auth = useSelector((state) => state.auth);

  // User object
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set page title
    document.title = props.title;

    // Fetch user
    axios
      .get(`/api/users/${username}`)
      .then((res) => {
        setUser(res.data);

        // Update page title
        document.title = res.data.username + titleSuffix;
      })
      .catch((err) => {
        // TODO: Handle error
        console.log(err);
      });
  }, [props.title, username]);

  // Stores the subpage that the user is on
  const [subpage, setSubpage] = useState("overview");

  return (
    <div>
      <MainNavbar />
      <div className="profile-header w-100">
        <div className="container-md">
          <div className="row mt-2">
            <div className="col-md-8 p-0">
              <div className="profile-header-info">
                <img
                  src={profilePic}
                  alt="profilepicture"
                  className="profile-pic mb-3"
                />
                <div className="ms-4 w-100 position-relative">
                  <h3 className="profile-name">
                    {user ? user.username : "loading..."}
                  </h3>
                  <p className="profile-location m-0">Leipzig, Germany</p>
                  <Button
                    className="btn btn-sm text-uppercase mt-2 px-5"
                    color="primary"
                    disabled={
                      !auth.isAuthenticated ||
                      !user ||
                      user._id === auth.user._id
                    }
                  >
                    <strong>
                      {user &&
                      user.followers.find(
                        (follower) => follower._id === auth.user._id
                      )
                        ? "Unfollow"
                        : "Follow"}
                    </strong>
                  </Button>
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
              <div className="profile-header-numbers">
                <button
                  className="profile-header-numbers-element px-2"
                  onClick={() => setSubpage("podcasts")}
                >
                  <h3 className="text-center m-0">
                    {user && user.episodes ? user.episodes.length : "0"}
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
                    {user && user.followers ? user.followers.length : "0"}
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
                    {user && user.following ? user.following.length : "0"}
                  </h3>
                  <p className="profile-header-numbers-text-bottom txt-center m-0">
                    Following
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-md">
        {subpage === "overview" && <Overview />}
        {subpage === "podcasts" && <Podcasts />}
        {subpage === "diary" && <Diary />}
        {subpage === "reviews" && <Reviews />}
        {subpage === "lists" && <Lists />}
        {subpage === "likes" && <Likes />}
        {subpage === "followers" && <Followers />}
        {subpage === "following" && <Following />}
      </div>
    </div>
  );
};

Profile.propTypes = {
  title: PropTypes.string,
};

export default Profile;
