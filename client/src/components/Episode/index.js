import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import axios from "axios";
import { titleSuffix } from "../../vars";
import loading from "../images/loading.gif";
import MainNavbar from "../shared/MainNavbar";
import MainFooter from "../shared/MainFooter";
import Error from "../shared/Error";

const Episode = (props) => {
  const { episodeId } = useParams();

  // Stores the episode object
  const [episode, setEpisode] = useState(undefined);

  // Stores the subpage that the use is on
  const [subpage, setSubpage] = useState("overview");

  // Stores whether or whether not the episode data is loading
  const [isLoadingEpisode, setIsLoadingEpisode] = useState(false);

  // Stores the potential error that occures when trying to fetch the episode object
  const [fetchEpisodeError, setFetchEpisodeError] = useState(null);

  useEffect(() => {
    // (Re)set page title
    document.title = props.title;

    // Reset episode
    setEpisode(null);

    // Reset error
    setFetchEpisodeError(null);

    // Reset subpage
    if (subpage !== "overview") {
      setSubpage("overview");
    }

    // Fetch user
    setIsLoadingEpisode(true);

    axios
      .get(`/api/episodes/${episodeId}`)
      .then((res) => {
        setIsLoadingEpisode(false);
        setEpisode(res.data);

        // Update page title
        document.title = res.data.title + titleSuffix;
      })
      .catch((err) => {
        setIsLoadingEpisode(false);
        setFetchEpisodeError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title, episodeId]);

  return (
    <div className="content">
      <div className="bg-main pb-5">
        <MainNavbar />
        {!fetchEpisodeError ? (
          <div>
            <div className="episode-header w-100 pt-56">
              <div className="container-md">
                <div className="row mt-2">
                  <div className="col-md-8">
                    <div className="d-flex">
                      {!isLoadingEpisode ? (
                        episode && (
                          <img
                            src={episode.thumbnail}
                            alt="episode thumbnail"
                            className="episode-thumbnail mb-3"
                          />
                        )
                      ) : (
                        <img
                          src={loading}
                          alt="loading..."
                          title="loading..."
                          className="episode-thumbnail mb-3"
                        />
                      )}
                      <div className="ms-4 w-100 position-relative fs-0">
                        <h3 className="ff-heading">
                          {!isLoadingEpisode
                            ? episode && episode.title
                            : "loading..."}
                        </h3>
                        <p className="episode-header-info-element m-0 mb-5">
                          {!isLoadingEpisode
                            ? episode &&
                              episode.description.replace(/(<([^>]+)>)/gi, "")
                            : null}
                        </p>
                        <div className="header-nav row w-50 m-0">
                          <button
                            onClick={() => setSubpage("overview")}
                            className={`header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "overview"
                                ? "header-nav-selected"
                                : "header-nav-unselected"
                            }`}
                          >
                            Overview
                          </button>
                          <button
                            onClick={() => setSubpage("lists")}
                            className={`header-nav-element col-md text-center text-uppercase text-decoration-none bold pt-1 ${
                              subpage === "lists"
                                ? "header-nav-selected"
                                : "header-nav-unselected"
                            }`}
                          >
                            Lists
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 position-relative">
                    {episode && (
                      <div className="header-numbers">
                        <button
                          className={`header-numbers-element ${
                            subpage === "overview"
                              ? "header-numbers-element-selected"
                              : null
                          } px-2`}
                          title={`${
                            episode ? episode.totalReviews : "0"
                          } Reviews`}
                          onClick={() => setSubpage("overview")}
                        >
                          <h3 className="text-center m-0">
                            {episode ? episode.totalReviews : "0"}
                          </h3>
                          <p className="header-numbers-text-bottom text-center m-0">
                            Reviews
                          </p>
                        </button>
                        <button
                          className={`header-numbers-element ${
                            subpage === "overview"
                              ? "header-numbers-element-selected"
                              : null
                          } px-2`}
                          title={`${
                            episode ? episode.totalListeners : "0"
                          } Likes`}
                          onClick={() => setSubpage("overview")}
                        >
                          <h3 className="text-center m-0">
                            {episode ? episode.totalListeners : "0"}
                          </h3>
                          <p className="header-numbers-text-bottom text-center m-0">
                            Listeners
                          </p>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Error error={fetchEpisodeError} />
        )}
      </div>
      <MainFooter />
    </div>
  );
};

Episode.propTypes = {
  title: PropTypes.string,
};

export default Episode;
