import { combineReducers } from "redux";

import stats from "./stats";

const rootReducer = combineReducers({
  stats,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
