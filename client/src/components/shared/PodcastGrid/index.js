import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { yearsArray } from "../../../vars";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const PodcastGrid = (props) => {
  const auth = useSelector((state) => state.auth);

  // Returns episodes array sorted by date in ascending order
  const sortEpisodesByDateAsc = (episodes) => {
    return episodes.sort(
      (a, b) =>
        new Date(a.episode.date).getTime() - new Date(b.episode.date).getTime()
    );
  };

  // Returns episodes array sorted by date in descending order
  const sortEpisodesByDateDes = (episodes) => {
    return episodes.sort(
      (a, b) =>
        new Date(b.episode.date).getTime() - new Date(a.episode.date).getTime()
    );
  };

  // Returns episodes array filtered for specific year
  const filterEpisodesForYear = (episodes, y) => {
    return episodes.filter(
      (episode) => new Date(episode.episode.date).getFullYear() === y
    );
  };

  // Returns episodes array filtered for if the user has also listened to this episode
  const filterUserListened = (episodes) => {
    if (!auth.user) return episodes;
    return episodes.filter((episode) =>
      auth.user.episodes.find((e) => e.episodeId === episode.episodeId)
    );
  };

  // Returns episodes array filtered for if the user has not listened to this episode
  const filterUserNotListened = (episodes) => {
    if (!auth.user) return episodes;
    return episodes.filter(
      (episode) =>
        !auth.user.episodes.find((e) => e.episodeId === episode.episodeId)
    );
  };

  const sortOptions = [
    "date (latest first)",
    "date (oldest first)",
    props.user ? `${props.user.username}'s rating` : null,
  ];

  const [sortBy, setSortBy] = useState(0);

  const [year, setYear] = useState(-1);

  const userListenedOptions = ["listened by you", "not listened by you"];

  const [userListened, setUserListened] = useState(-1);

  const [episodes, setEpisodes] = useState(props.episodes);

  const resetConfigs = () => {
    setSortBy(0);
    setYear(-1);
    setUserListened(-1);
  };

  useEffect(() => {
    let newEpisodes = props.episodes;

    switch (sortBy) {
      case 0:
        newEpisodes = sortEpisodesByDateAsc(newEpisodes);
        break;
      case 1:
        newEpisodes = sortEpisodesByDateDes(newEpisodes);
        break;
      default:
        break;
    }

    switch (year) {
      case -1:
        break;
      default:
        newEpisodes = filterEpisodesForYear(newEpisodes, year);
        break;
    }

    switch (userListened) {
      case -1:
        break;
      case 0:
        console.log("userlistened");
        newEpisodes = filterUserListened(newEpisodes);
        break;
      case 1:
        console.log("user not listened");
        newEpisodes = filterUserNotListened(newEpisodes);
        break;
      default:
        break;
    }

    setEpisodes(newEpisodes);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, year, userListened]);

  return (
    <div className="container-md">
      <div className="grid-section">
        <h4 className="section-heading text-center mt-5 mb-0 text-capitalize">
          {`Podcast episodes (${props.episodes.length})`}
        </h4>
        <hr className="section-separator mt-1 mb-3" />
        <div className="card mb-3 py-1 px-3">
          <div className="row">
            <div className="col-md-10 d-flex">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-dark text-start dropdown-toggle py-0 px-1 white-space-normal"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sort by
                  <mark className="mark-secondary">{sortOptions[sortBy]}</mark>
                </button>
                <div className="dropdown-menu dropdown-dark">
                  {sortOptions.map((option, index) => (
                    <button
                      className={`dropdown-item text-center ${
                        sortBy === index ? "invisible h-0 p-0" : null
                      }`}
                      key={index}
                      onClick={() => setSortBy(index)}
                    >
                      {sortOptions[index]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="btn-group ms-4">
                <button
                  type="button"
                  className="btn btn-dark text-start dropdown-toggle py-0 px-1 w-100 white-space-normal"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {year === -1 ? "Year" : year}
                </button>
                <div className="dropdown-menu dropdown-scrollable dropdown-dark">
                  <button
                    className={`dropdown-item text-center ${
                      year === 0 ? "invisible h-0 p-0" : null
                    }`}
                    key="-1"
                    onClick={() => setYear(-1)}
                  >
                    {"Remove this filter"}
                  </button>
                  {yearsArray(1990).map((y, index) => (
                    <button
                      className={`dropdown-item text-center ${
                        year === y ? "invisible h-0 p-0" : null
                      }`}
                      key={index}
                      onClick={() => setYear(y)}
                    >
                      {String(y)}
                    </button>
                  ))}
                </div>
              </div>
              <div
                className={`btn-group ms-4 ${
                  !auth.isAuthenticated ? "invisible" : null
                }`}
              >
                <button
                  type="button"
                  className="btn btn-dark text-start dropdown-toggle py-0 px-1 white-space-normal"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userListened === -1
                    ? "Status"
                    : userListenedOptions[userListened]}
                </button>
                <div className="dropdown-menu dropdown-scrollable dropdown-dark">
                  <button
                    className={`dropdown-item text-center ${
                      userListened === -1 ? "invisible h-0 p-0" : null
                    }`}
                    key="-1"
                    onClick={() => setUserListened(-1)}
                  >
                    {"Remove this filter"}
                  </button>
                  {userListenedOptions.map((option, index) => (
                    <button
                      className={`dropdown-item text-center ${
                        index === userListened ? "invisible h-0 p-0" : null
                      }`}
                      key={index}
                      onClick={() => setUserListened(index)}
                    >
                      {userListenedOptions[index]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-dark py-0 px-1 float-end text-danger"
                title="Reset to default"
                onClick={() => resetConfigs()}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
        <div className="podcast-grid-container">
          {episodes.map((episode, index) => (
            <div className="" key={episode.episodeId}>
              {episode.episode.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PodcastGrid.propTypes = {
  episodes: PropTypes.array,
  user: PropTypes.object,
};

export default PodcastGrid;
