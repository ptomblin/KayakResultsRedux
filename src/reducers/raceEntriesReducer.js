// raceEntriesReducer is responsible for everything to do with the race entries

import {
  RACE_ENTRIES_ERROR, RACE_ENTRIES_REQUEST_FETCH, RACE_ENTRIES_RECEIVE_FETCH, RACE_ENTRIES_START_EDITING, RACE_ENTRIES_REQUEST_START_EDITING,
  RACE_ENTRIES_CLEAR, RACE_ENTRIES_EDITING_CHANGE_FIELDS, RACE_ENTRIES_END_EDITING,
  RACE_ENTRIES_REQUEST_DELETE, RACE_ENTRIES_RECEIVE_DELETE,
  RACE_ENTRIES_REQUEST_BY_BOATNUMBER, RACE_ENTRIES_RECIEVE_BY_BOATNUMBER
} from '../actions/raceEntriesAction';
import { STATE_PENDING, STATE_TRUE, STATE_FALSE, STATE_ERROR } from '../configureDB';

const initialState = {
  entries: [],
  entries_status: STATE_PENDING,
  editing_status: STATE_PENDING,
  fetching_status: STATE_PENDING
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case RACE_ENTRIES_ERROR:
      return {
        ...state,
        entries_status: STATE_ERROR
      };
    case RACE_ENTRIES_REQUEST_FETCH:
      return {
        ...state,
        entries_status: STATE_PENDING,
        entries: []
      };
    case RACE_ENTRIES_RECEIVE_FETCH:
      return {
        ...state,
        entries_status: STATE_TRUE,
        entries: action.entries
      };
    case RACE_ENTRIES_CLEAR:
      return {
        ...state,
        entries_status: STATE_PENDING
      };
    case RACE_ENTRIES_REQUEST_START_EDITING:
      return {
        ...state, editing_status: STATE_PENDING
      };
    case RACE_ENTRIES_START_EDITING:
      return {
        ...state,
        editing_status: STATE_TRUE,
        entry: action.entry
      };
    case RACE_ENTRIES_EDITING_CHANGE_FIELDS:
    {
      const entry = {
        ...state.entry,
        ...action.fieldValues
      };
      entry.category = [
        entry.boatcategory,
        entry.boatclass,
        entry.agecategory,
        entry.gendercategory
      ].join(' ');

      return {
        ...state,
        entry: entry
      };
    }
    case RACE_ENTRIES_END_EDITING:
      return {
        ...state,
        entry: action.entry,
        editing_status: STATE_PENDING
      };
    case RACE_ENTRIES_REQUEST_DELETE:
      return {
        ...state,
        entries_status: STATE_PENDING,
        edit_status: STATE_PENDING
      };
    case RACE_ENTRIES_RECEIVE_DELETE:
      return state;
    case RACE_ENTRIES_REQUEST_BY_BOATNUMBER:
      return {
        ...state,
        fetching_status: STATE_PENDING
      };
    case RACE_ENTRIES_RECIEVE_BY_BOATNUMBER:
      return {
        ...state,
        fetching_status: STATE_TRUE,
        matches: action.matches
      };
    default:
      return state;
  }
};
