export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export function setError (source, msg) {
  return {
    type: SET_ERROR,
    error_source: source,
    message: msg
  };
}
export function clearError (source) {
  return {
    type: RESET_ERROR,
    error_source: source
  };
}
