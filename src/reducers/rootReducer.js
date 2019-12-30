import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import configReducer from './configReducer';
import errorReducer from './errorReducer';
import raceEntriesReducer from './raceEntriesReducer';

const createRouteReducer = (history) => combineReducers({
  router: connectRouter(history),
  errorReducer,
  configReducer,
  raceEntriesReducer
});

export default createRouteReducer;
