import React from "react";
import PropTypes from "prop-types";
import profilePic from "./images/profile.png";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import Overview from "./shared/Overview";
import Podcasts from "./shared/Podcasts";
import Diary from "./shared/Diary";
import Reviews from "./shared/Reviews";
import Lists from "./shared/Lists";
import Likes from "./shared/Likes";
import { useState, initialState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile(props) {
  const { username } = useParams();

  useEffect(() => {
    // Set page title
    document.title = username;
  }, [username]);

  var [state, setState] = useState(initialState);

  state = {
    overviewShown: false,
    podcastsShown: false,
    diaryShown: false,
    reviewsShown: false,
    listsShown: false,
    likesShown: false,
  };

  const handleOverview = () => {
    setState({
      overviewShown: true,
      podcastsShown: false,
      diaryShown: false,
      reviewsShown: false,
      listsShown: false,
      likesShown: false,
    });
  };

  const handlePodcasts = () => {
    setState({
      overviewShown: false,
      podcastsShown: true,
      diaryShown: false,
      reviewsShown: false,
      listsShown: false,
      likesShown: false,
    });
  };

  const handleDiary = () => {
    setState({
      overviewShown: false,
      podcastsShown: false,
      diaryShown: true,
      reviewsShown: false,
      listsShown: false,
      likesShown: false,
    });
  };

  const handleReviews = () => {
    setState({
      overviewShown: false,
      podcastsShown: false,
      diaryShown: false,
      reviewsShown: true,
      listsShown: false,
      likesShown: false,
    });
  };

  const handleLists = () => {
    setState({
      overviewShown: false,
      podcastsShown: false,
      diaryShown: false,
      reviewsShown: false,
      listsShown: true,
      likesShown: false,
    });
  };

  const handleLikes = () => {
    setState({
      overviewShown: false,
      podcastsShown: false,
      diaryShown: false,
      reviewsShown: false,
      listsShown: false,
      likesShown: true,
    });
  };

  return (
    <div>
      <div className="profile-container">
        <Container className="container-fluid">
          {" "}
          <Row className="vert-center">
            <Col xs="2">
              {" "}
              <img
                src={profilePic}
                alt="profilepicture"
                className="profile-pic"
              />
            </Col>
            <Col xs="7">
              {" "}
              <h6 className="profile-name">Konrad Goldammer</h6>
              <p className="white">Leipzig, Germany</p>
              <button className="btn btn-sm btn-primary text-uppercase bold btn-follow">
                follow
              </button>
            </Col>
            <Col>
              <h6 className="white txt-center">100</h6>
              <p className="white txt-center">podcasts</p>
            </Col>
            <Col>
              <h6 className="white txt-center">100</h6>
              <p className="white txt-center">podcasts</p>
            </Col>
            <Col>
              <h6 className="white txt-center">100</h6>
              <p className="white txt-center">podcasts</p>
            </Col>
          </Row>{" "}
          <Container>
            <Row className="toggle-div">
              <Container>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={handleOverview}
                >
                  Overview
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={handlePodcasts}
                >
                  Podcasts
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={handleDiary}
                >
                  Diary
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={handleReviews}
                >
                  Reviews
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={handleLists}
                >
                  Lists
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={handleLikes}
                >
                  Likes
                </Button>
              </Container>
            </Row>
          </Container>
        </Container>
      </div>
      <Container className="container-fluid">
        {state.overviewShown ? <Overview /> : null}
        {state.podcastsShown ? <Podcasts /> : null}
        {state.diaryShown ? <Diary /> : null}
        {state.reviewsShown ? <Reviews /> : null}
        {state.listsShown ? <Lists /> : null}
        {state.likesShown ? <Likes /> : null}
        <Overview />
      </Container>
      {/* <SmallFooter /> */}
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
};

export default Profile;
