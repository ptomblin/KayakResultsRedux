import { POUCH_RESET_ERROR, POUCH_SET_ERROR } from '../actions/pouchAction';

const initialState = {
  error_message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POUCH_SET_ERROR:
      return {
        ...state,
        error_message: action.message
      };
    case POUCH_RESET_ERROR:
      return {
        ...state,
        error_message: ''
      };
    default:
      return state;
  }
};
