import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  lists: listsReducer,
  users:usersReducer
});