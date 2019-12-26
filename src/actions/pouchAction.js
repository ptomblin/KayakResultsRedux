import { db, CONFIG_ID, DOC_TYPE_ENTRIES } from '../configureDB';

export const POUCH_ERROR = 'POUCH_ERROR';
export function pouchError (msg) {
  return {
    type: POUCH_ERROR,
    message: msg
  };
}

export const POUCH_REQUEST_CONFIG = 'POUCH_REQUEST_CONFIG';
export const POUCH_RECEIVE_CONFIG = 'POUCH_RECEIVE_CONFIG';

export function pouchRequestConfig () {
  return {
    type: POUCH_REQUEST_CONFIG
  };
}
export function pouchReceiveConfig (doc) {
  return {
    type: POUCH_RECEIVE_CONFIG,
    config: doc
  };
}

// Gets the PouchDB document with the race configuration in it.
export function pouchFetchConfig () {
  return dispatch => {
    dispatch(pouchRequestConfig());
    return db.get(CONFIG_ID)
      .then(doc => {
        dispatch(pouchReceiveConfig(doc));
      })
      .catch(err => {
        dispatch(pouchError(err.name === 'not_found' ? 'Race Configuration not found' : err.message));
      });
  };
}

export const POUCH_REQUEST_RACE_ENTRIES = 'POUCH_REQUEST_RACE_ENTRIES';
export const POUCH_RECEIVE_RACE_ENTRIES = 'POUCH_RECEIVE_RACE_ENTRIES';

export function pouchRequestRaceEntries () {
  return {
    type: POUCH_REQUEST_RACE_ENTRIES
  };
}
export function pouchReceiveRaceEntries (response) {
  return {
    type: POUCH_RECEIVE_RACE_ENTRIES,
    entries: response.docs
  };
}

// Gets all the Race Entries in the pouchdb.
export function pouchFetchRaceEntries () {
  return dispatch => {
    dispatch(pouchRequestRaceEntries());
    return db.find({
      selector: { type: DOC_TYPE_ENTRIES }
    })
      .then(response => dispatch(pouchReceiveRaceEntries(response)))
      .catch(err => dispatch(pouchError(err)));
  };
}

export const POUCH_REQUEST_PUT_ENTRY = 'POUCH_REQUEST_PUT_ENTRY';
export const POUCH_RECEIVE_PUT_ENTRY = 'POUCH_RECEIVE_PUT_ENTRY';

export function pouchRequestPutEntry () {
  return {
    type: POUCH_REQUEST_PUT_ENTRY
  };
}
export function pouchReceivePutEntry () {
  return {
    type: POUCH_RECEIVE_PUT_ENTRY
  };
}

// Puts an entry. Requests an _id to be already set if new.
export function pouchPutEntry (entry) {
  return dispatch => {
    dispatch(pouchRequestPutEntry());
    return db.put(entry)
      .then(res => dispatch(pouchReceivePutEntry()))
      .catch(err => dispatch(pouchError(err)));
  };
}

export const POUCH_REQUEST_DELETE_ENTRY = 'POUCH_REQUEST_DELETE_ENTRY';
export const POUCH_RECEIVE_DELETE_ENTRY = 'POUCH_RECEIVE_DELETE_ENTRY';

export function pouchRequestDeleteEntry () {
  return {
    type: POUCH_REQUEST_DELETE_ENTRY
  };
}
export function pouchReceiveDeleteEntry () {
  return {
    type: POUCH_RECEIVE_DELETE_ENTRY
  };
}

// Deletes a given entry.
export function pouchDeleteEntry (entry) {
  return dispatch => {
    dispatch(pouchRequestDeleteEntry());
    return db.remove(entry._id, entry._rev)
      .then(res => dispatch(pouchReceiveDeleteEntry()))
      .catch(err => dispatch(pouchError(err)));
  };
}

export const POUCH_REQUEST_GET_ENTRY_BY_BOATNUMBER = 'POUCH_REQUEST_GET_ENTRY_BY_BOATNUMBER';
export const POUCH_RECEIVE_GET_ENTRY_BY_BOATNUMBER = 'POUCH_RECEIVE_GET_ENTRY_BY_BOATNUMBER';

export function pouchRequestGetEntryByBoatNumber () {
  return {
    type: POUCH_REQUEST_GET_ENTRY_BY_BOATNUMBER
  };
}
export function pouchReceiveGetEntryByBoatNumber (docs) {
  return {
    type: POUCH_RECEIVE_GET_ENTRY_BY_BOATNUMBER,
    match: docs
  };
}

// Returns either 0 or 1 matching race results doc with the given boat number
export function pouchGetEntryByBoatNumber (boatNumber) {
  return dispatch => {
    dispatch(pouchRequestGetEntryByBoatNumber());
    return db.find({
      selector: { boatnumber: boatNumber }
    })
      .then(res => dispatch(pouchGetEntryByBoatNumber(res.docs)))
      .catch(err => dispatch(pouchError(err)));
  };
}
