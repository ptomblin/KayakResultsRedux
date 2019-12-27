import { RESET_ERROR, SET_ERROR } from '../actions/errorAction';

const initialState = {
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
    {
      const newErrors = { ...state.errors, [action.error_source]: action.message };
      return {
        ...state,
        errors: newErrors
      };
    }
    case RESET_ERROR:
    {
      const newErrors = { ...state.errors };
      delete newErrors[action.error_source];

      return {
        ...state,
        errors: newErrors
      };
    }
    default:
      return state;
  }
};
