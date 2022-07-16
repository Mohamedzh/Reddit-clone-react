import { combineReducers } from "redux";
import postsReducer from "./posts.reducer";
import lightReducer from "./light.reducer";
import darkReducer from "./dark.reducer";
import variantReducer from "./variant.reducer";
import themeReducer from "./themeBtn.reducer";
import bwReducer from "./blackWhite.reducer";

const reducers = combineReducers({postsReducer, lightReducer, darkReducer, variantReducer, themeReducer, bwReducer});

export default reducers