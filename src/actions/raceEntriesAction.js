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
export const RACE_ENTRIES_CLEAR = 'RACE_ENTRIES_CLEAR';

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
export function dispatchClearRaceEntries () {
  return {
    type: RACE_ENTRIES_CLEAR
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

// This just sets the state to PENDING to make sure we fetch them again.
export function clearRaceEntries () {
  return dispatch => dispatch(dispatchClearRaceEntries());
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

// Puts an entry. Requires an _id to be already set if new.
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

export const RACE_ENTRIES_REQUEST_GET = 'RACE_ENTRIES_REQUEST_GET';
export const RACE_ENTRIES_RECEIVE_GET = 'RACE_ENTRIES_RECEIVE_GET';

export function requestGetRaceEntry (id) {
  return {
    type: RACE_ENTRIES_REQUEST_GET,
    id: id
  };
}
export function receiveGetRaceEntry (entry) {
  return {
    type: RACE_ENTRIES_RECEIVE_GET,
    entry: entry
  };
}

// Get an entry.
export function getRaceEntry (id) {
  return dispatch => {
    dispatch(clearError(errorSource));
    dispatch(requestGetRaceEntry());
    return db.get(id)
      .then(doc => dispatch(receiveGetRaceEntry(doc)))
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
export function deleteEntry (entry) {
  return dispatch => {
    dispatch(requestDeleteRaceEntry());
    return db.remove(entry)
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
    matches: docs
  };
}

// Returns either 0 or 1 matching race results doc with the given boat number
export function getEntryByBoatNumber (boatNumber) {
  return dispatch => {
    dispatch(requestByBoatNumberRaceEntry());
    return db.find({
      selector: {
        type: DOC_TYPE_ENTRIES,
        boatnumber: boatNumber
      }
    })
      .then(res => dispatch(recieveByBoatNumberRaceEntry(res.docs)))
      .catch(err => {
        dispatch(raceEntriesHasError());
        dispatch(setError(errorSource, err));
      });
  };
}

export const RACE_ENTRIES_REQUEST_START_EDITING = 'RACE_ENTRIES_REQUEST_START_EDITING';
export const RACE_ENTRIES_START_EDITING = 'RACE_ENTRIES_START_EDITING';
export const RACE_ENTRIES_EDITING_CHANGE_FIELDS = 'RACE_ENTRIES_EDITING_CHANGE_FIELDS';
export const RACE_ENTRIES_END_EDITING = 'RACE_ENTRIES_END_EDITING';
export function requestStartEditingRaceEntry () {
  return {
    type: RACE_ENTRIES_REQUEST_START_EDITING
  };
}
export function setEditingRaceEntry (entry) {
  return {
    type: RACE_ENTRIES_START_EDITING,
    entry: entry
  };
}
export function requestEndEditingRaceEntry (entry) {
  return {
    type: RACE_ENTRIES_END_EDITING,
    entry: entry
  };
}

export function changeFieldRaceEntrys (fieldValues) {
  return {
    type: RACE_ENTRIES_EDITING_CHANGE_FIELDS,
    fieldValues: fieldValues
  };
}
const randId = () => (new Date()).getTime().toString();
const defaultEntry = {
  type: DOC_TYPE_ENTRIES,
  p1name: '',
  p2name: '',
  p1addr2: '',
  p2addr2: '',
  agecategory: '',
  gendercategory: '',
  boatnumber: '',
  boatcategory: '',
  boatclass: '',
  category: '',
  result: ''
};

export function startEditingRaceEntry (id) {
  return dispatch => {
    if (id !== '0') {
      dispatch(clearError(errorSource));
      dispatch(requestStartEditingRaceEntry());
      return db.get(id)
        .then(doc => dispatch(setEditingRaceEntry(doc)))
        .catch(err => {
          dispatch(raceEntriesHasError());
          dispatch(setError(errorSource, err.name === 'not_found' ? 'Given race entry not found' : err.message));
        });
    } else {
      dispatch(setEditingRaceEntry({ ...defaultEntry, _id: randId() }));
    }
  };
}
export function changeRaceEntryField (field, value) {
  return dispatch => {
    dispatch(changeFieldRaceEntrys({ [field]: value }));
  };
}
export function changeRaceEntryFields (fieldValues) {
  return dispatch => {
    dispatch(changeFieldRaceEntrys(fieldValues));
  };
}
export function endEditingRaceEntry (doc) {
  return dispatch => {
    dispatch(clearError(errorSource));
    return db.put(doc)
      .then(doc => dispatch(requestEndEditingRaceEntry({ ...defaultEntry, _id: randId() })))
      .catch(err => {
        dispatch(raceEntriesHasError());
        dispatch(setError(errorSource, err.name === 'not_found' ? 'Given race entry not found' : err.message));
      });
  };
}
