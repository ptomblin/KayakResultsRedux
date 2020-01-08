import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';

const $ = require('jquery');
$.DataTable = require('datatables.net-buttons-bs4');
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
require('datatables.net-buttons/js/buttons.html5.js')();
require('datatables.net-buttons/js/buttons.print.js')();
require('datatables.net-rowgroup-bs4');

const columns = [
  { title: 'Category', data: 'category', width: '25%', visible: false },
  { title: 'Result', data: 'result', className: 'fixedTable', width: '5em' },
  { title: 'Pos.', data: 'position', className: 'fixedTable', width: '2em' },
  { title: 'Behind<br>Leader', data: 'behindLeader', className: 'fixedTable', width: '5em' },
  { title: 'Behind<br>Prev', data: 'behindPrev', className: 'fixedTable', width: '5em' },
  { title: 'Boat #', data: 'boatnumber', className: 'fixedTable', width: '2em' },
  { title: 'Name 1', data: 'p1name', width: '20%' },
  { title: 'Addr 1', data: 'p1addr2', width: '10%' },
  { title: 'Name 2', data: 'p2name', width: '20%' },
  { title: 'Addr 2', data: 'p2addr2', width: '10%' }
];

var initDate = new Date(2000, 1, 1);
initDate.setUTCHours(0);
initDate.setUTCMinutes(0);
initDate.setUTCSeconds(0);
initDate.setUTCMinutes(0);

function hhmmssToDate (str) {
  var d = new Date(initDate.getTime());
  var numbers = str.match(/[\d.]+/g).map(Number);
  d.setUTCSeconds(numbers.pop());
  if (numbers.length > 0) {
    d.setUTCMinutes(numbers.pop());
  }
  if (numbers.length > 0) {
    d.setUTCHours(numbers.pop());
  }
  return d;
}

function millisecondsToHHMMSS (num) {
  var seconds = Math.round(num / 1000);
  var hours = Math.floor(seconds / (60 * 60));
  var divMins = seconds % (60 * 60);
  var mins = Math.floor(divMins / 60);
  var secs = Math.ceil(divMins % 60);
  return ('00' + hours).slice(-2) + ':' + ('00' + mins).slice(-2) + ':' + ('00' + secs).slice(-2);
}

export class AllResults extends Component {
  constructor (props) {
    super(props);
    this.tbl = null;
    this.onClick.bind(this);
  }

  onClick (e) {
    const data = this.tbl.row(e.target).data();
    const boatnumber = data ? data.boatnumber : undefined;
    if (boatnumber) {
      this.props.onClick(boatnumber);
    }
  }

  getBestTimes (timeStorage, useCategory, doc) {
    const cat = !useCategory ? 'all' : doc.category;
    if (!(cat in timeStorage)) {
      timeStorage[cat] = {
        bestTime: doc.resDate,
        prevTime: doc.resDate,
        currentPos: 1
      };
    }
    if (!useCategory && !(doc.category in timeStorage)) {
      timeStorage[doc.category] = {
        currentPos: 1
      };
    }
    const prevTime = timeStorage[cat].prevTime;
    timeStorage[cat].prevTime = doc.resDate;

    return [timeStorage[cat].bestTime, prevTime, timeStorage[doc.category].currentPos++];
  }

  componentDidMount () {
    console.log('componentDidMount');
    const timeStorage = {};
    const useCategory = true; // Need to track the radio button bar instead
    const results = this.props.entries
      .map(doc => ({ ...doc, resDate: doc.result ? hhmmssToDate(doc.result) : null }))
      .sort((a, b) => {
        if (useCategory && a.category < b.category) return -1;
        if (useCategory && a.category > b.category) return 1;
        if (a.resDate && b.resDate) return a.resDate - b.resDate;
        if (a.result) return -1;
        if (b.result) return 1;
        return 0;
      })
      .map(doc => {
        const docCopy = { ...doc };
        if (doc.resDate) {
          var values = this.getBestTimes(timeStorage, useCategory, doc);
          var bestTime = values[0];
          var prevTime = values[1];
          var currentPos = values[2];

          docCopy.position = currentPos;
          docCopy.result = millisecondsToHHMMSS(hhmmssToDate(doc.result) - initDate);
          docCopy.behindLeader = millisecondsToHHMMSS(doc.resDate - bestTime);
          docCopy.behindPrev = millisecondsToHHMMSS(doc.resDate - prevTime);
        } else {
          docCopy.position = '-';
          docCopy.result = 'NF';
          docCopy.behindLeader = '-';
          docCopy.behindPrev = '-';
        }
        return docCopy;
      });
    console.log(results);

    this.tbl = $(this.refs.main).DataTable({
      dom: '<"data-table-wrapper"t>pB',
      destroy: true,
      select: true,
      rowGroup: {
        dataSrc: 'category'
      },
      orderFixed: [
        [0, 'asc']
      ],
      data: results,
      columns,
      searching: false,
      lengthChange: true,
      buttons: [
        {
          extend: 'print',
          orientation: 'landscape'
        },
        {
          extend: 'pdfHtml5',
          orientation: 'landscape'
        },
        'csvHtml5'
      ]
    });
    this.tbl.on('click', 'tr', (e) => { this.onClick(e); });
    console.log('didMount finishing');
    console.log(this.tbl);
  }

  componentWillUnmount () {
    console.log('will unmount');
    this.tbl.destroy(true);
    this.tbl = null;
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup type='radio' name='results-grouping' defaultValue='category'>
            <ToggleButton value='category'>Group by Category</ToggleButton>
            <ToggleButton value='overall'>Overall Results</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <Table striped bordered id='results-table' ref='main' />
        <Row ref='button_row' />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entries: state.raceEntriesReducer.entries
  };
};
const mapDispatchToProps = dispatch => ({
  onClick: (id) => {
    dispatch(push('/result/' + id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllResults);
