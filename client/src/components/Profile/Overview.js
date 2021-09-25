import React, { Component } from "react";
import "../../App.css";
import { Button, Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import PodcastImage from "../images/podcast1.png";
import PlanetMoney from "../images/planetmoney1.png";
import LexFridman from "../images/lexfridmanpodcast.png";
import TheDaily from "../images/thedailypodcast.png";
import TheAmercianLife from "../images/theAmericanLife.png";
import circularProfile from "../images/profile.png";
import Stars from "../images/stars.png";
import likeIcon from "../images/likedIcon.png";
import Like from "../images/whiteHeart.png";
import Comment from "../images/comment.png";
import Author from "../images/author.png";
import Calendar from "../images/calendar.png";

class Overview extends Component {
  render() {
    return (
      <div>
        <h6 className="white txt-center">Favorite Podcasts</h6>
        <hr className="white horizontal-line" />
        <Row>
          <Col xs="6">
            <img className="overview-image" alt="podcast" src={PodcastImage} />
            <img className="overview-image" alt="podcast" src={PlanetMoney} />
          </Col>
          <Col xs="6">
            <img className="overview-image" alt="podcast" src={LexFridman} />
            <img className="overview-image" alt="podcast" src={TheDaily} />
          </Col>
        </Row>
        <Row className="second-section">
          <Col x="6">
            {" "}
            <h6 className="white txt-center">Recent Reviews</h6>
            <hr className="white horizontal-line" />
            <Row className="black-bg black-card">
              <Col xs="3">
                <img
                  className="theAmericanLife"
                  alt="podcast"
                  src={TheAmercianLife}
                />
              </Col>
              <Col xs="9">
                <h5 className="white">742: The Thing I am Getting Over</h5>
                <Row>
                  <Col xs="1">
                    <img
                      className="small-profile"
                      alt="profilePic"
                      src={circularProfile}
                    />
                  </Col>
                  <Col xs="5" className="no-margin">
                    <p className="white txt-center small-name">
                      Konrad Goldammer
                    </p>
                  </Col>
                  <Col xs="4" className="no-margin">
                    <img
                      className="small-stars"
                      src={Stars}
                      alt="reviewStars"
                    />
                  </Col>
                  <Col xs="1" className="no-margin">
                    <img className="like-icon" src={likeIcon} alt="likeIcon" />
                  </Col>
                  <Col xs="1"></Col>
                </Row>
                <p className="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <Row>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Like} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">213</p>
                  </Col>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Comment} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">40</p>
                  </Col>
                  <Col>
                    <p className="date-ago">2 days ago</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="black-bg black-card">
              <Col xs="3">
                <img
                  className="theAmericanLife"
                  alt="podcast"
                  src={TheAmercianLife}
                />
              </Col>
              <Col xs="9">
                <h5 className="white">742: The Thing I am Getting Over</h5>
                <Row>
                  <Col xs="1">
                    <img
                      className="small-profile"
                      alt="profilePic"
                      src={circularProfile}
                    />
                  </Col>
                  <Col xs="5" className="no-margin">
                    <p className="white txt-center small-name">
                      Konrad Goldammer
                    </p>
                  </Col>
                  <Col xs="4" className="no-margin">
                    <img
                      className="small-stars"
                      src={Stars}
                      alt="reviewStars"
                    />
                  </Col>
                  <Col xs="1" className="no-margin">
                    <img className="like-icon" src={likeIcon} alt="likeIcon" />
                  </Col>
                  <Col xs="1"></Col>
                </Row>
                <p className="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <Row>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Like} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">213</p>
                  </Col>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Comment} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">40</p>
                  </Col>
                  <Col>
                    <p className="date-ago">2 days ago</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="black-bg black-card">
              <Col xs="3">
                <img
                  className="theAmericanLife"
                  alt="podcast"
                  src={TheAmercianLife}
                />
              </Col>
              <Col xs="9">
                <h5 className="white">742: The Thing I am Getting Over</h5>
                <Row>
                  <Col xs="1">
                    <img
                      className="small-profile"
                      alt="profilePic"
                      src={circularProfile}
                    />
                  </Col>
                  <Col xs="5" className="no-margin">
                    <p className="white txt-center small-name">
                      Konrad Goldammer
                    </p>
                  </Col>
                  <Col xs="4" className="no-margin">
                    <img
                      className="small-stars"
                      src={Stars}
                      alt="reviewStars"
                    />
                  </Col>
                  <Col xs="1" className="no-margin">
                    <img className="like-icon" src={likeIcon} alt="likeIcon" />
                  </Col>
                  <Col xs="1"></Col>
                </Row>
                <p className="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <Row>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Like} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">213</p>
                  </Col>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Comment} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">40</p>
                  </Col>
                  <Col>
                    <p className="date-ago">2 days ago</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="black-bg black-card">
              <Col xs="3">
                <img
                  className="theAmericanLife"
                  alt="podcast"
                  src={TheAmercianLife}
                />
              </Col>
              <Col xs="9">
                <h5 className="white">742: The Thing I am Getting Over</h5>
                <Row>
                  <Col xs="1">
                    <img
                      className="small-profile"
                      alt="profilePic"
                      src={circularProfile}
                    />
                  </Col>
                  <Col xs="5" className="no-margin">
                    <p className="white txt-center small-name">
                      Konrad Goldammer
                    </p>
                  </Col>
                  <Col xs="4" className="no-margin">
                    <img
                      className="small-stars"
                      src={Stars}
                      alt="reviewStars"
                    />
                  </Col>
                  <Col xs="1" className="no-margin">
                    <img className="like-icon" src={likeIcon} alt="likeIcon" />
                  </Col>
                  <Col xs="1"></Col>
                </Row>
                <p className="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <Row>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Like} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">213</p>
                  </Col>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Comment} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">40</p>
                  </Col>
                  <Col>
                    <p className="date-ago">2 days ago</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="black-bg black-card">
              <Col xs="3">
                <img
                  className="theAmericanLife"
                  alt="podcast"
                  src={TheAmercianLife}
                />
              </Col>
              <Col xs="9">
                <h5 className="white">742: The Thing I am Getting Over</h5>
                <Row>
                  <Col xs="1">
                    <img
                      className="small-profile"
                      alt="profilePic"
                      src={circularProfile}
                    />
                  </Col>
                  <Col xs="5" className="no-margin">
                    <p className="white txt-center small-name">
                      Konrad Goldammer
                    </p>
                  </Col>
                  <Col xs="4" className="no-margin">
                    <img
                      className="small-stars"
                      src={Stars}
                      alt="reviewStars"
                    />
                  </Col>
                  <Col xs="1" className="no-margin">
                    <img className="like-icon" src={likeIcon} alt="likeIcon" />
                  </Col>
                  <Col xs="1"></Col>
                </Row>
                <p className="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <Row>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Like} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">213</p>
                  </Col>
                  <Col xs="1">
                    {" "}
                    <img className="small-icon" src={Comment} alt="like" />
                  </Col>
                  <Col xs="2">
                    {" "}
                    <p className="white">40</p>
                  </Col>
                  <Col>
                    <p className="date-ago">2 days ago</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col x="6">
            {" "}
            <h6 className="white txt-center">Lists</h6>
            <hr className="white horizontal-line" />
            <Row className="black-bg right-list">
              <img className="author" src={Author} alt="author" />
              <h6 className="white hearlist">Hearlist</h6>
              <Row>
                <Col xs="1">
                  <img
                    className="small-profile no-margin"
                    alt="profilePic"
                    src={circularProfile}
                  />
                </Col>
                <Col xs="4" className="no-margin">
                  <p className="white txt-center small-name no-margin">
                    Konrad Goldammer
                  </p>
                </Col>
              </Row>
            </Row>
            <Row className="black-bg right-list">
              <img className="author" src={Author} alt="author" />
              <h6 className="white hearlist">Hearlist</h6>
              <Row>
                <Col xs="1">
                  <img
                    className="small-profile no-margin"
                    alt="profilePic"
                    src={circularProfile}
                  />
                </Col>
                <Col xs="4" className="no-margin">
                  <p className="white txt-center small-name no-margin">
                    Konrad Goldammer
                  </p>
                </Col>
                <Col>
                  <p className="date-ago">2 days ago</p>
                </Col>
                <Col xs="1">
                  {" "}
                  <img className="small-icon" src={Like} alt="like" />
                </Col>
                <Col xs="1">
                  {" "}
                  <p className="white">213</p>
                </Col>
                <Col xs="1">
                  {" "}
                  <img className="small-icon" src={Comment} alt="like" />
                </Col>
                <Col xs="1">
                  {" "}
                  <p className="white">40</p>
                </Col>
              </Row>
            </Row>
            <button className="black-bg btn-load-more white">
              load more...
            </button>
            <h6 className="white txt-center dairy">Dairy</h6>
            <hr className="white horizontal-line" />
            <Row className="black-bg dairy-div">
              <Col xs="3">
                <img className="calendar" src={Calendar} alt="calendar" />
              </Col>
              <Col xs="9">
                <h3 className="white">742: The thing I am Getti...</h3>
                <h4 className="white">This American Life</h4>
                <h5 className="white light">31st June, 2021</h5>
              </Col>
            </Row>
            <Row className="black-bg dairy-div">
              <Col xs="3">
                <img className="calendar" src={Calendar} alt="calendar" />
              </Col>
              <Col xs="9">
                <h3 className="white">742: The thing I am Getti...</h3>
                <h4 className="white">This American Life</h4>
                <h5 className="white light">31st June, 2021</h5>
              </Col>
            </Row>
            <Row className="black-bg dairy-div">
              <Col xs="3">
                <img className="calendar" src={Calendar} alt="calendar" />
              </Col>
              <Col xs="9">
                <h3 className="white">742: The thing I am Getti...</h3>
                <h4 className="white">This American Life</h4>
                <h5 className="white light">31st June, 2021</h5>
              </Col>
            </Row>
            <Row className="black-bg dairy-div">
              <Col xs="3">
                <img className="calendar" src={Calendar} alt="calendar" />
              </Col>
              <Col xs="9">
                <h3 className="white">742: The thing I am Getti...</h3>
                <h4 className="white">This American Life</h4>
                <h5 className="white light">31st June, 2021</h5>
              </Col>
            </Row>
            <button className="black-bg btn-load-more white">
              load more...
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Overview;
