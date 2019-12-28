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
        // Handle transition to new name
        const newDoc = { ...doc };
        // if (doc.boat_classes) {
        //   newDoc.boat_categories = doc.boat_classes;
        //   delete newDoc.boat_classes;
        //   saveConfig(newDoc);
        // }
        dispatch(receiveFetchConfig(newDoc));
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

// Remove a specific entry from one of the categories (age, gender)
export const CONFIG_REMOVE_FROM_CATEGORY = 'CONFIG_REMOVE_FROM_CATEGORY';
export function configRemoveCategory (category, item) {
  return {
    type: CONFIG_REMOVE_FROM_CATEGORY,
    category: category,
    item: item
  };
}

export function removeEntryFromAgeCategoryConfig (item) {
  return dispatch => {
    dispatch(configRemoveCategory('age_categories', item));
  };
}

export function removeEntryFromGenderCategoryConfig (item) {
  return dispatch => {
    dispatch(configRemoveCategory('gender_categories', item));
  };
}

export const CONFIG_ADD_TO_CATEGORY = 'CONFIG_ADD_TO_CATEGORY';
export function configAddCategory (category, item) {
  return {
    type: CONFIG_ADD_TO_CATEGORY,
    category: category,
    item: item
  };
}

export function addEntryToAgeCategoryConfig (item) {
  return dispatch => {
    dispatch(configAddCategory('age_categories', item));
  };
}

export function addEntryToGenderCategoryConfig (item) {
  return dispatch => {
    dispatch(configAddCategory('gender_categories', item));
  };
}

export const CONFIG_REMOVE_FROM_BOAT_CATEGORY = 'CONFIG_REMOVE_FROM_BOAT_CATEGORY';
export function configRemoveBoatCategory (item) {
  return {
    type: CONFIG_REMOVE_FROM_BOAT_CATEGORY,
    item: item
  };
}

export function removeEntryFromBoatCategoryConfig (item) {
  return dispatch => {
    dispatch(configRemoveBoatCategory(item));
  };
}

export const CONFIG_ADD_TO_BOAT_CATEGORY = 'CONFIG_ADD_TO_BOAT_CATEGORY';
export function configAddBoatCategory (item) {
  return {
    type: CONFIG_ADD_TO_BOAT_CATEGORY,
    item: item
  };
}

export function addEntryToBoatCategoryConfig (item) {
  return dispatch => {
    dispatch(configAddBoatCategory(item));
  };
}

export const CONFIG_REMOVE_FROM_BOAT_CLASS = 'CONFIG_REMOVE_FROM_BOAT_CLASS';
export function configRemoveBoatClass (category, item) {
  return {
    type: CONFIG_REMOVE_FROM_BOAT_CLASS,
    category: category,
    item: item
  };
}

export function removeEntryFromBoatClassConfig (category, item) {
  return dispatch => {
    dispatch(configRemoveBoatClass(category, item));
  };
}

export const CONFIG_ADD_TO_BOAT_CLASS = 'CONFIG_ADD_TO_BOAT_CLASS';
export function configAddBoatClass (category, item) {
  return {
    type: CONFIG_ADD_TO_BOAT_CLASS,
    category: category,
    item: item
  };
}

export function addEntryToBoatClassConfig (category, item) {
  return dispatch => {
    dispatch(configAddBoatClass(category, item));
  };
}

export const CONFIG_UPDATE_RACE_NAME = 'CONFIG_UPDATE_RACE_NAME';
export function configUpdateRaceName (raceName) {
  return {
    type: CONFIG_UPDATE_RACE_NAME,
    race_name: raceName
  };
}

export function updateRaceNameConfig (raceName) {
  return dispatch => {
    dispatch(configUpdateRaceName(raceName));
  };
}

export const CONFIG_UPDATE_RACE_DATE = 'CONFIG_UPDATE_RACE_DATE';
export function configUpdateRaceDate (raceDate) {
  return {
    type: CONFIG_UPDATE_RACE_DATE,
    race_date: raceDate
  };
}

export function updateRaceDateConfig (raceDate) {
  return dispatch => {
    dispatch(configUpdateRaceDate(raceDate));
  };
}
