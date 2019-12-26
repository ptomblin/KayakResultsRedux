// Appreducer is responsible for checkint if you're logged in, the config is loaded, etc.

import { POUCH_REQUEST_CONFIG, POUCH_RECEIVE_CONFIG, POUCH_ERROR } from '../actions/pouchAction';
import { STATE_PENDING, STATE_TRUE, STATE_FALSE, STATE_ERROR } from '../configureDB';

const initialState = {
  config_found: STATE_PENDING,
  config: {},
  error_message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POUCH_REQUEST_CONFIG:
      return {
        ...state,
        config_found: STATE_PENDING
      };
    case POUCH_RECEIVE_CONFIG:
      return {
        ...state,
        config: action.config,
        config_found: action.config ? STATE_TRUE : STATE_FALSE
      };
    case POUCH_ERROR:
      return {
        ...state,
        config_found: STATE_ERROR,
        error_message: action.message
      };
    default:
      return state;
  }
};
