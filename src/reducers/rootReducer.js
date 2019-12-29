import { combineReducers } from 'redux';
import configReducer from './configReducer';
import errorReducer from './errorReducer';
import raceEntriesReducer from './raceEntriesReducer';

export default combineReducers({
  errorReducer,
  configReducer,
  raceEntriesReducer
});
