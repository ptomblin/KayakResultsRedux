// configReducer is responsible for everything to do with the configuration

import { CONFIG_REQUEST_FETCH, CONFIG_RECEIVE_FETCH, CONFIG_RECEIVE_PUT, CONFIG_REQUEST_PUT, CONFIG_ERROR } from '../actions/configAction';
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
    case CONFIG_REQUEST_FETCH:
      return {
        ...state,
        config_found: STATE_PENDING
      };
    case CONFIG_RECEIVE_FETCH:
      return {
        ...state,
        config: action.config,
        config_found: action.config ? STATE_TRUE : STATE_FALSE
      };
    case CONFIG_ERROR:
      return {
        ...state,
        config_found: STATE_ERROR,
        config: process.env.NODE_ENV !== 'production' ? defaultRaceConfig : {}
      };
    case CONFIG_REQUEST_PUT:
      return {
        ...state,
        config_found: STATE_PENDING
      };
    case CONFIG_RECEIVE_PUT:
      return {
        ...state,
        config_found: STATE_TRUE,
        config: action.config
      };
    default:
      return state;
  }
};
