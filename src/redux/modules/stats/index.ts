import { handleActions, createAction } from "redux-actions";
// @ts-ignore
import { createActionThunk } from "redux-thunk-actions";

import { RootState } from "../../modules";
import API from "../../../service/api";

//- Types
// -----------------

export type StatsState = {
  list: any[];
};

//- Actions names
// -----------------
const STATS_LOAD = "STATS_LOAD";
const STATS_DELETE_ITEM = "STATS_DELETE_ITEM";

//- Actions
// ------------------
export const loadStats = createActionThunk(STATS_LOAD, API.stats.get);
export const deleteStatsListItemById = createAction(STATS_DELETE_ITEM);

//- Selectors
// ------------------
export const getStats = ({ stats }: RootState): StatsState => stats;
export const getStatsList = (store: RootState) => getStats(store).list;

//- Initisal state
// ------------------
const initialState = {
  list: [],
};

//- Reducer
// ------------------
export default handleActions<StatsState, any>(
  {
    [`${STATS_LOAD}_SUCCEEDED`]: (state, { payload: { data } }) => ({
      ...state,
      list: data,
    }),
    [STATS_DELETE_ITEM]: (state, { payload: id}) => ({
      ...state,
      list: state.list.filter((i) => i.id != id),
    })},

  initialState
);
