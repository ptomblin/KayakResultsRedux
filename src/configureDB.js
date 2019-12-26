// var PouchDB = require('pouchdb');
// PouchDB.plugin(require('pouchdb-find'));
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
PouchDB.plugin(find);

const remoteUrl = 'http://localhost:5984';
const CONFIG_ID = 'race_config';

// All docs will have a "type" entry
const DOC_TYPE_CONFIG = 'CONFIG';
const DOC_TYPE_ENTRIES = 'ENTRIES';

// All state variables will have the following possibles (would this be better as an object?)
const STATE_PENDING = 'STATE_PENDING';
const STATE_TRUE = 'STATE_TRUE';
const STATE_FALSE = 'STATE_FALSE';
const STATE_ERROR = 'STATE_ERROR';

const db = new PouchDB('kayak_results');

db.createIndex({
  index: {
    fields: ['boatnumber']
  }
});
db.createIndex({
  index: {
    fields: ['type']
  }
});

export { remoteUrl, db, CONFIG_ID, DOC_TYPE_CONFIG, DOC_TYPE_ENTRIES, STATE_PENDING, STATE_TRUE, STATE_FALSE, STATE_ERROR };
