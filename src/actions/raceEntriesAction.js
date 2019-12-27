import { db, DOC_TYPE_ENTRIES } from '../configureDB';
import { setError, clearError } from './errorAction';

const errorSource = 'RaceEntries';

export const RACE_ENTRIES_ERROR = 'RACE_ENTRIES_ERROR';
export function raceEntriesHasError () {
  return {
    type: RACE_ENTRIES_ERROR
  };
}

export const RACE_ENTRIES_REQUEST_FETCH = 'RACE_ENTRIES_REQUEST_FETCH';
export const RACE_ENTRIES_RECEIVE_FETCH = 'RACE_ENTRIES_RECEIVE_FETCH';

export function requestFetchRaceEntries () {
  return {
    type: RACE_ENTRIES_REQUEST_FETCH
  };
}
export function receiveFetchRaceEntries (response) {
  return {
    type: RACE_ENTRIES_RECEIVE_FETCH,
    entries: response.docs
  };
}

// Gets all the Race Entries in the pouchdb.
export function fetchRaceEntries () {
  return dispatch => {
    dispatch(clearError(errorSource));
    dispatch(requestFetchRaceEntries());
    return db.find({
      selector: { type: DOC_TYPE_ENTRIES }
    })
      .then(response => dispatch(receiveFetchRaceEntries(response)))
      .catch(err => {
        dispatch(raceEntriesHasError());
        dispatch(setError(errorSource, err));
      });
  };
}

export const RACE_ENTRIES_REQUEST_PUT = 'RACE_ENTRIES_REQUEST_PUT';
export const RACE_ENTRIES_RECEIVE_PUT = 'RACE_ENTRIES_RECEIVE_PUT';

export function requestPutRaceEntry () {
  return {
    type: RACE_ENTRIES_REQUEST_PUT
  };
}
export function receivePutRaceEntry () {
  return {
    type: RACE_ENTRIES_RECEIVE_PUT
  };
}

// Puts an entry. Requests an _id to be already set if new.
export function putRaceEntry (entry) {
  return dispatch => {
    dispatch(clearError(errorSource));
    dispatch(requestPutRaceEntry());
    return db.put(entry)
      .then(res => dispatch(receivePutRaceEntry()))
      .catch(err => {
        dispatch(raceEntriesHasError());
        dispatch(setError(errorSource, err));
      });
  };
}

export const RACE_ENTRIES_REQUEST_DELETE = 'RACE_ENTRIES_REQUEST_DELETE';
export const RACE_ENTRIES_RECEIVE_DELETE = 'RACE_ENTRIES_RECEIVE_DELETE';

export function requestDeleteRaceEntry () {
  return {
    type: RACE_ENTRIES_REQUEST_DELETE
  };
}
export function receieveDeleteRaceEntry () {
  return {
    type: RACE_ENTRIES_RECEIVE_DELETE
  };
}

// Deletes a given entry.
export function pouchDeleteEntry (entry) {
  return dispatch => {
    dispatch(requestDeleteRaceEntry());
    return db.remove(entry._id, entry._rev)
      .then(res => dispatch(receieveDeleteRaceEntry()))
      .catch(err => dispatch(setError(errorSource, err)));
  };
}

export const RACE_ENTRIES_REQUEST_BY_BOATNUMBER = 'RACE_ENTRIES_REQUEST_BY_BOATNUMBER';
export const RACE_ENTRIES_RECIEVE_BY_BOATNUMBER = 'RACE_ENTRIES_RECIEVE_BY_BOATNUMBER';

export function requestByBoatNumberRaceEntry () {
  return {
    type: RACE_ENTRIES_REQUEST_BY_BOATNUMBER
  };
}
export function recieveByBoatNumberRaceEntry (docs) {
  return {
    type: RACE_ENTRIES_RECIEVE_BY_BOATNUMBER,
    match: docs
  };
}

// Returns either 0 or 1 matching race results doc with the given boat number
export function getEntryByBoatNumber (boatNumber) {
  return dispatch => {
    dispatch(requestByBoatNumberRaceEntry());
    return db.find({
      selector: { boatnumber: boatNumber }
    })
      .then(res => dispatch(getEntryByBoatNumber(res.docs)))
      .catch(err => {
        dispatch(raceEntriesHasError());
        dispatch(setError(errorSource, err));
      });
  };
}
