import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainNavbar from "../shared/MainNavbar";
import MainFooter from "../shared/MainFooter";
import PodcastColumn from "../shared/PodcastColumn";
import Header from "../Home/Header";
import "../../App.css";
import axios from "axios";

const Home = (props) => {
  const [mostPopularPodcasts, setMostPopularPodcasts] = useState([]);

  useEffect(() => {
    // Set page title
    document.title = props.title;

    // Fetch most popular podcasts
    axios.get("/api/podcasts/most-popular").then((res) => {
      const podcasts = res.data;

      for (let i = podcasts.length; i <= 5; i++) {
        podcasts.push(null);
      }

      console.log(podcasts);

      setMostPopularPodcasts(podcasts);
    });
  }, [props.title]);

  return (
    <div>
      <MainNavbar />
      <Header />
      <div className="container-md">
        <div className="most-popular-podcasts-section">
          <h4 className="section-heading txt-center mt-5 mb-0">
            Most Popular Podcasts
          </h4>
          <hr className="section-separator mt-1" />
          <div className="row mt-2">
            {mostPopularPodcasts.map((mostPopularPodcast, index) => (
              <PodcastColumn key={index} podcast={mostPopularPodcast} />
            ))}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

Home.propTypes = {
  title: PropTypes.string,
};

export default Home;
