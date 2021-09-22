import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import MainNavBar from "../components/subcomponents/MainNavbar";
import podcastPic from "../components/images";

const PodcastScreen = () => {
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    //fetch
  }, []);

  return (
    <div>
      <MainNavBar />
      <div>
        <Container>
          <Row>
            <img
              src={podcastPic}
              alt="podcast logo"
              className="podcast-pic"
              width="80"
              height="140"
            />
            <h4 className="podcast-title">Podcast Title</h4>
            <h5 className="podcast-author">Author</h5>
            <p className="podcast-description"></p>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PodcastScreen;
