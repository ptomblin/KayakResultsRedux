// raceEntriesReducer is responsible for everything to do with the race entries

import {
  RACE_ENTRIES_ERROR, RACE_ENTRIES_REQUEST_FETCH, RACE_ENTRIES_RECEIVE_FETCH, RACE_ENTRIES_REQUEST_PUT, RACE_ENTRIES_RECEIVE_PUT,
  RACE_ENTRIES_REQUEST_DELETE, RACE_ENTRIES_RECEIVE_DELETE, RACE_ENTRIES_REQUEST_BY_BOATNUMBER, RACE_ENTRIES_RECIEVE_BY_BOATNUMBER, RACE_ENTRIES_CLEAR
} from '../actions/raceEntriesAction';
import { STATE_PENDING, STATE_TRUE, STATE_FALSE, STATE_ERROR } from '../configureDB';

const initialState = {
  entries: [],
  entries_status: STATE_PENDING
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
    // case CONFIG_RECEIVE_FETCH:
    //   return {
    //     ...state,
    //     config: action.config,
    //     config_found: action.config ? STATE_TRUE : STATE_FALSE
    //   };
    // case CONFIG_ERROR:
    //   return {
    //     ...state,
    //     config_found: STATE_ERROR,
    //     config: process.env.NODE_ENV !== 'production' ? defaultRaceConfig : {}
    //   };
    // case CONFIG_REQUEST_PUT:
    //   return {
    //     ...state,
    //     config_found: STATE_PENDING
    //   };
    // case CONFIG_RECEIVE_PUT:
    //   return {
    //     ...state,
    //     config_found: STATE_TRUE,
    //     config: action.config
    //   };
    // case CONFIG_REMOVE_FROM_CATEGORY:
    // {
    //   const confCopy = { ...state.config };
    //   confCopy[action.category] = confCopy[action.category].filter(ac => ac !== action.item);
    //   return {
    //     ...state,
    //     config: confCopy
    //   };
    // }
    // case CONFIG_ADD_TO_CATEGORY:
    // {
    //   const confCopy = { ...state.config };
    //   confCopy[action.category] = [...confCopy[action.category], action.item];
    //   return {
    //     ...state,
    //     config: confCopy
    //   };
    // }
    // case CONFIG_REMOVE_FROM_BOAT_CATEGORY:
    // {
    //   const confCopy = { ...state.config };
    //   confCopy.boat_categories = confCopy.boat_categories.filter(bc => bc.category !== action.item);
    //   return {
    //     ...state,
    //     config: confCopy
    //   };
    // }
    // case CONFIG_ADD_TO_BOAT_CATEGORY:
    // {
    //   const confCopy = { ...state.config };
    //   const newCategory = {
    //     category: action.item,
    //     classes: []
    //   };
    //   confCopy.boat_categories = [...confCopy.boat_categories, newCategory];
    //   return {
    //     ...state,
    //     config: confCopy
    //   };
    // }
    // case CONFIG_REMOVE_FROM_BOAT_CLASS:
    // {
    //   const confCopy = { ...state.config, boat_categories: [...state.config.boat_categories] };
    //   // Find the one in boat_categories to edit (find doesn't make a copy, but we've already make a copy above)
    //   const catCopy = confCopy.boat_categories.find(bc => bc.category === action.category);
    //   catCopy.classes = catCopy.classes.filter(cl => cl.Name !== action.item);
    //   return {
    //     ...state,
    //     config: confCopy
    //   };
    // }
    // case CONFIG_ADD_TO_BOAT_CLASS:
    // {
    //   const confCopy = { ...state.config, boat_categories: [...state.config.boat_categories] };
    //   // Find the one in boat_categories to edit (find doesn't make a copy, but we've already make a copy above)
    //   const catCopy = confCopy.boat_categories.find(bc => bc.category === action.category);
    //   catCopy.classes = [...catCopy.classes, { Name: action.item, hasCrew: false }];
    //   return {
    //     ...state,
    //     config: confCopy
    //   };
    // }
    // case CONFIG_UPDATE_RACE_NAME:
    //   return { ...state, config: { ...state.config, race_name: action.race_name } };
    // case CONFIG_UPDATE_RACE_DATE:
    //   return { ...state, config: { ...state.config, race_date: action.race_date } };
    default:
      return state;
  }
};
