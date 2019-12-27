// Appreducer is responsible for checkint if you're logged in, the config is loaded, etc.

import { POUCH_REQUEST_FETCH_CONFIG, POUCH_RECEIVE_FETCH_CONFIG, POUCH_ERROR_CONFIG, POUCH_RECEIVE_PUT_CONFIG, POUCH_REQUEST_PUT_CONFIG } from '../actions/pouchAction';
import { STATE_PENDING, STATE_TRUE, STATE_FALSE, STATE_ERROR } from '../configureDB';

const initialState = {
  config_found: STATE_PENDING,
  config: {}
};

const defaultRaceConfig = {
  race_director: 'Paul Tomblin',
  race_director_id: 'ptomblin',
  race_name: 'Round The Mountain 2020',
  race_date: '2020/04/20',
  age_categories: [
    'Under 50',
    'Over 50',
    'Mixed'
  ],
  gender_categories: [
    'Male',
    'Female',
    'Mixed'
  ],
  boat_classes: [
    {
      category: 'Guideboat',
      classes: [
        {
          Name: '1 Person',
          hasCrew: false
        },
        {
          Name: '2 Person',
          hasCrew: true
        },
        {
          Name: 'Open Touring',
          hasCrew: false
        }
      ]
    },
    {
      category: 'Kayak',
      classes: [
        {
          Name: 'Recreational',
          hasCrew: false
        },
        {
          Name: 'K-1 Touring',
          hasCrew: false
        },
        {
          Name: 'K-1 Unlimited',
          hasCrew: false
        },
        {
          Name: 'K-2 Double Kayak',
          hasCrew: true
        }
      ]
    },
    {
      category: 'Canoe',
      classes: [
        {
          Name: 'Solo Recreational',
          hasCrew: false
        },
        {
          Name: 'Double Recreational',
          hasCrew: true
        },
        {
          Name: 'C-1 Stock',
          hasCrew: false
        },
        {
          Name: 'C-2 Stock',
          hasCrew: true
        },
        {
          Name: 'C-2 Amateur',
          hasCrew: true
        },
        {
          Name: 'C-4 Stock',
          hasCrew: true
        },
        {
          Name: 'Voyageur',
          hasCrew: true
        }
      ]
    },
    {
      category: 'SUP',
      classes: [
        {
          Name: '12\' 6" Class',
          hasCrew: false
        },
        {
          Name: '14\' Class',
          hasCrew: false
        }
      ]
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POUCH_REQUEST_FETCH_CONFIG:
      return {
        ...state,
        config_found: STATE_PENDING
      };
    case POUCH_RECEIVE_FETCH_CONFIG:
      return {
        ...state,
        config: action.config,
        config_found: action.config ? STATE_TRUE : STATE_FALSE
      };
    case POUCH_ERROR_CONFIG:
      return {
        ...state,
        config_found: STATE_ERROR,
        config: process.env.NODE_ENV !== 'production' ? defaultRaceConfig : {}
      };
    case POUCH_REQUEST_PUT_CONFIG:
      return {
        ...state,
        config_found: STATE_PENDING
      };
    case POUCH_RECEIVE_PUT_CONFIG:
      return {
        ...state,
        config_found: STATE_TRUE,
        config: action.config
      };
    default:
      return state;
  }
};
