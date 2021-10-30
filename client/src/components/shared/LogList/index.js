import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert, Button } from "reactstrap";
import loading1 from "../../images/loading1.gif";
import axios from "axios";
import LogCard from "./LogCard";

const LogList = ({ id }) => {
  // Stores the logs array
  const [logs, setLogs] = useState([]);

  // Stores the amount of logs to skip on next load
  const [skip, setSkip] = useState(0);

  // Is true if more logs can theoretically be loaded
  const [loadMore, setLoadMore] = useState(true);

  // Is true if more logs are being loaded atm
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Is storing potential error that occurred on fetching logs
  const [logsFetchError, setLogsFetchError] = useState(null);

  useEffect(() => {
    // Reset logs
    setLogs([]);

    // Reset skip
    setSkip(0);

    //Reset loadMore
    setLoadMore(true);
  }, [id]);

  useEffect(() => {
    // Reset fetch error
    setLogsFetchError(null);

    // Fetch reviews
    setIsLoadingLogs(true);

    if (!id) {
      return setLogsFetchError({ status: 400 });
    }

    axios
      .get(`/api/reviews/user/logs/${id}/?skip=${skip}`)
      .then((res) => {
        setIsLoadingLogs(false);

        if (res.data.length === 0) {
          return setLoadMore(false);
        }

        // Add newly fetched logs to state
        setLogs((logs) => [...logs, ...res.data]);
      })
      .catch((err) => {
        setIsLoadingLogs(false);

        setLogsFetchError({
          status: err.response.status,
          msg: err.response.msg,
        });
      });
  }, [skip, id]);

  return (
    <div className="log-list">
      {logs.map((log) => (
        <LogCard key={log._id} log={log} />
      ))}

      {!logsFetchError ? (
        isLoadingLogs ? (
          <div className="w-100">
            <img
              src={loading1}
              alt="loading..."
              title="loading..."
              className="text-center d-block mx-auto loading-gif"
            />
          </div>
        ) : logs.length === 0 ? (
          <p className="m-0 p-0">Could not find any logs</p>
        ) : (
          <>
            {loadMore && (
              <Button
                className="w-100 btn btn-sm text-uppercase"
                color="dark"
                onClick={() => setSkip((skip) => skip + 3)}
              >
                <strong>load more...</strong>
              </Button>
            )}
          </>
        )
      ) : (
        <Alert color="danger fs-small">
          {`${logsFetchError.status} ${
            logsFetchError.msg
              ? logsFetchError.msg
              : "An error occurred while loading the logs (try reloading the page)"
          }
          `}
        </Alert>
      )}
    </div>
  );
};

LogList.propTypes = {
  id: PropTypes.string,
};

export default LogList;
