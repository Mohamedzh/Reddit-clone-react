import { combineReducers } from "redux";
import postsReducer from "./posts.reducer";
import elementReducer from "./element.reducer";
import changeThemeReducer from "./theme.reducer";

const reducers = combineReducers({postsReducer, elementReducer, changeThemeReducer});

export default reducers