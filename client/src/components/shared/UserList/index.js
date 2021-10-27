import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { isError } from "../../../vars";
import { Button, Alert } from "reactstrap";
import UserCard from "./UserCard";
import loading1 from "../../images/loading1.gif";

const UserList = (props) => {
  // Stores users that are displayed in the list of users
  const [users, setUsers] = useState([]);

  // Stores whether of whether not the 'load more' button should be shown
  const [showLoadMore, setShowLoadMore] = useState(true);

  // Stores whether or whether not the app is loading more users
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    handleLoadMore(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = (skip) => {
    const maxUsersPerLoad = 5;

    if (skip + maxUsersPerLoad >= props.userIds.length) {
      setShowLoadMore(false);
    }

    const idsToLoad = props.userIds.slice(skip, skip + maxUsersPerLoad);

    if (idsToLoad.length === 0) return;

    setIsLoadingMore(true);

    Promise.all(
      idsToLoad.map(
        (idToLoad) =>
          new Promise((resolve, reject) => {
            axios
              .get(`/api/users/id/${idToLoad ? idToLoad : "0"}`)
              .then((res) => resolve(res.data))
              .catch((err) => resolve(err));
          })
      )
    ).then((newlyLoadedUsers) => {
      setUsers([...[...users].slice(0, skip), ...newlyLoadedUsers]);
      setIsLoadingMore(false);
    });
  };

  return (
    <div className="container-md">
      <div className="list-section">
        <h4 className="section-heading text-center mt-5 mb-0 text-capitalize">
          {`${props.type} (${props.userIds.length})`}
        </h4>
        <hr className="section-separator mt-1 mb-3" />
        {users.map((obj, index) =>
          isError(obj) ? (
            <Alert color="danger fs-small mb-2" key={index}>{`${
              obj.response.status
            } ${
              obj.response.data.msg
                ? obj.response.data.msg
                : "An error occurred while loading recent logs"
            }`}</Alert>
          ) : (
            <UserCard user={obj} key={obj._id} />
          )
        )}
        {users.length === 0 && <p>{`No ${props.type} yet`}</p>}
        {isLoadingMore && (
          <div className="w-100">
            <img
              src={loading1}
              alt="loading..."
              title="loading..."
              className="text-center d-block mx-auto loading-gif"
            />
          </div>
        )}
        {showLoadMore && !isLoadingMore && (
          <Button
            className="w-100 btn btn-sm text-uppercase"
            color="dark"
            onClick={() => handleLoadMore(users.length)}
          >
            <strong>load more...</strong>
          </Button>
        )}
      </div>
    </div>
  );
};

UserList.propTypes = {
  type: PropTypes.string,
  userIds: PropTypes.array,
};

export default UserList;
