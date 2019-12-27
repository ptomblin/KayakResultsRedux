import { combineReducers } from 'redux';
import appReducer from './appReducer';
import pouchErrorReducer from './pouchErrorReducer';

export default combineReducers({
  pouchErrorReducer,
  appReducer
});
