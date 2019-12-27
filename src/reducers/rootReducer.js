import { combineReducers } from 'redux';
import configReducer from './configReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  errorReducer,
  configReducer
});
