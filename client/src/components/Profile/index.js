import React from "react";
import PropTypes from "prop-types";
import profilePic from "./images/profile.png";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import Overview from "../shared/Overview";
import Podcasts from "../shared/Podcasts";
import Diary from "../shared/Diary";
import Reviews from "../shared/Reviews";
import Lists from "../shared/Lists";
import Likes from "../shared/Likes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { titleSuffix } from "../../vars";
import axios from "axios";

function Profile(props) {
  const { username } = useParams();

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
                  onClick={() => setSubpage("overview")}
                >
                  Overview
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={() => setSubpage("podcasts")}
                >
                  Podcasts
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={() => setSubpage("diary")}
                >
                  Diary
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={() => setSubpage("reviews")}
                >
                  Reviews
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={() => setSubpage("lists")}
                >
                  Lists
                </Button>
                <Button
                  className="toggle-button"
                  color="white"
                  onClick={() => setSubpage("likes")}
                >
                  Likes
                </Button>
              </Container>
            </Row>
          </Container>
        </Container>
      </div>
      <Container className="container-fluid">
        {subpage === "overview" && <Overview />}
        {subpage === "podcasts" && <Podcasts />}
        {subpage === "diary" && <Diary />}
        {subpage === "reviews" && <Reviews />}
        {subpage === "lists" && <Lists />}
        {subpage === "likes" && <Likes />}
      </Container>
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
};

export default Profile;
