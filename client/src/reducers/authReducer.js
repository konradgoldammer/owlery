import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_UPDATED,
  USER_UPDATING,
  USER_UPDATE_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  isUpdatingUser: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case USER_UPDATING:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case USER_UPDATED:
      return {
        ...state,
        isUpdatingUser: false,
        user: { ...state.user, location: action.payload },
      };
    case USER_UPDATE_ERROR:
      return {
        ...state,
        isUpdatingUser: false,
      };
    default:
      return state;
  }
};

export default reducer;
