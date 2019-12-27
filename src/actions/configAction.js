import { db, CONFIG_ID } from '../configureDB';
import { setError, clearError } from './errorAction';

const errorSource = 'RaceConfig';

export const CONFIG_REQUEST_FETCH = 'CONFIG_REQUEST_FETCH';
export const CONFIG_RECEIVE_FETCH = 'CONFIG_RECEIVE_FETCH';
export const CONFIG_ERROR = 'CONFIG_ERROR';
export const CONFIG_REQUEST_PUT = 'CONFIG_REQUEST_PUT';
export const CONFIG_RECEIVE_PUT = 'CONFIG_RECEIVE_PUT';

export function requestFetchConfig () {
  return {
    type: CONFIG_REQUEST_FETCH
  };
}
export function receiveFetchConfig (doc) {
  return {
    type: CONFIG_RECEIVE_FETCH,
    config: doc
  };
}
export function configHasError () {
  return {
    type: CONFIG_ERROR
  };
}
export function requestPutConfig () {
  return {
    type: CONFIG_REQUEST_PUT
  };
}
export function receivePutConfig (doc) {
  console.log(doc);
  return {
    type: CONFIG_RECEIVE_PUT,
    config: doc
  };
}

// Gets the PouchDB document with the race configuration in it.
export function fetchConfig () {
  return dispatch => {
    dispatch(clearError(errorSource));
    dispatch(requestFetchConfig());
    return db.get(CONFIG_ID)
      .then(doc => {
        dispatch(receiveFetchConfig(doc));
      })
      .catch(err => {
        dispatch(configHasError());
        dispatch(setError(errorSource, err.name === 'not_found' ? 'Race Configuration not found' : err.message));
      });
  };
}
// Save race config back to PouchDB
export function saveConfig (config) {
  return dispatch => {
    dispatch(clearError(errorSource));
    dispatch(requestPutConfig());
    return db.put({ ...config, _id: CONFIG_ID })
      .then(res => dispatch(receivePutConfig({ ...config, _rev: res.rev })))
      .catch(err => {
        dispatch(configHasError());
        dispatch(setError(errorSource, err.message));
      });
  };
}
