import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import MainNavbar from "../shared/MainNavbar";
import MainFooter from "../shared/MainFooter";
import PodcastColumn from "../shared/PodcastColumn";
import Header from "../Home/Header";
import loading1 from "../images/loading1.gif";
import axios from "axios";

const Home = (props) => {
  const [mostPopularPodcasts, setMostPopularPodcasts] = useState([]);
  const [isLoadingMostPopularPodcasts, setIsLoadingMostPopularPodcasts] =
    useState(false);
  const [mostPopularPodcastsFetchError, setMostPopularPodcastsFetchError] =
    useState(null);

  useEffect(() => {
    // Set page title
    document.title = props.title;

    // Fetch most popular podcasts
    setIsLoadingMostPopularPodcasts(true);

    axios
      .get("/api/podcasts/most-popular")
      .then((res) => {
        setIsLoadingMostPopularPodcasts(false);

        const podcasts = res.data;

        for (let i = podcasts.length; i < 5; i++) {
          podcasts.push(null);
        }

        setMostPopularPodcasts(podcasts);
      })
      .catch((err) => {
        setIsLoadingMostPopularPodcasts(false);

        setMostPopularPodcastsFetchError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
  }, [props.title]);

  return (
    <div className="content">
      <div className="bg-main pb-5">
        <MainNavbar />
        <Header />
        <div className="container-md">
          <div className="most-popular-podcasts-section mt-5">
            <h4 className="section-heading text-center mb-0">
              Most Popular Podcasts
            </h4>
            <hr className="section-separator mt-1 mb-3" />
            <div className="row m-0">
              {!isLoadingMostPopularPodcasts &&
                !mostPopularPodcastsFetchError &&
                mostPopularPodcasts.map((mostPopularPodcast, index) =>
                  mostPopularPodcast ? (
                    <PodcastColumn
                      key={mostPopularPodcast._id}
                      podcast={mostPopularPodcast}
                      first={index === 0}
                    />
                  ) : (
                    <div
                      key={index}
                      className={`col-md p-0 ${index !== 0 && "ms-2"}`}
                    />
                  )
                )}
              {isLoadingMostPopularPodcasts && (
                <div className="w-100">
                  <img
                    src={loading1}
                    alt="loading..."
                    title="loading..."
                    className="text-center d-block mx-auto loading-gif"
                  />
                </div>
              )}
              {mostPopularPodcastsFetchError && (
                <Alert color="danger fs-small">{`${
                  mostPopularPodcastsFetchError.status
                } ${
                  mostPopularPodcastsFetchError.msg
                    ? mostPopularPodcastsFetchError.msg
                    : "An error occurred while loading most popular podcasts"
                }`}</Alert>
              )}
            </div>
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
