import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
