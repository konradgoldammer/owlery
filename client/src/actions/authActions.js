import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_UPDATING,
  USER_UPDATED,
  USER_UPDATE_ERROR,
} from "./types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register =
  ({ username, email, password }) =>
  (dispatch) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ username, email, password });

    axios
      .post("api/users", body, config)
      .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

// Login user
export const login =
  ({ data, password }) =>
  (dispatch) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ data, password });

    axios
      .post("api/auth", body, config)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

// Logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Update user
export const updateUser = (changes) => async (dispatch, getState) => {
  // User updating
  dispatch({ type: USER_UPDATING });

  let updatedUser = null;
  let error = false;

  await axios
    .put(
      "/api/users/location",
      { newLocation: changes.newLocation },
      tokenConfig(getState)
    )
    .then((res) => {
      updatedUser = res.data;
    })
    .catch((err) => {
      error = true;
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "USER_UPDATE_ERROR"
        )
      );
      return dispatch({ type: USER_UPDATE_ERROR });
    });

  await axios
    .put(
      "/api/users/website",
      { newWebsite: changes.newWebsite },
      tokenConfig(getState)
    )
    .then((res) => {
      updatedUser = res.data;
    })
    .catch((err) => {
      error = true;
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "USER_UPDATE_ERROR"
        )
      );
      dispatch({ type: USER_UPDATE_ERROR });
    });

  if (!updatedUser || error) {
    return;
  }

  dispatch({ type: USER_UPDATED, payload: updatedUser });
};

// Follow user
export const followUser = (userId) => async (dispatch, getState) => {
  // User updating
  dispatch({ type: USER_UPDATING });

  await axios
    .put("/api/users/follow", { userId }, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_UPDATED, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "USER_UPDATE_ERROR"
        )
      );
      return dispatch({ type: USER_UPDATE_ERROR });
    });
};

// Follow user
export const unfollowUser = (userId) => async (dispatch, getState) => {
  // User updating
  dispatch({ type: USER_UPDATING });

  await axios
    .put("/api/users/unfollow", { userId }, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_UPDATED, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "USER_UPDATE_ERROR"
        )
      );
      return dispatch({ type: USER_UPDATE_ERROR });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, then add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
