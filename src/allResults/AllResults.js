import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

const $ = require('jquery');
$.DataTable = require('datatables.net-buttons-bs4');
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
require('datatables.net-buttons/js/buttons.html5.js')();
require('datatables.net-buttons/js/buttons.print.js')();

const columns = [
  { title: 'Category', data: 'category', width: '25%' },
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

// test only:
const data = [
  {
    category: 'Kayak K-1 Unlimited Over 50 Male',
    result: '01:20:01',
    position: '1',
    behindLeader: '00:00:00',
    behindPrev: '00:00:00',
    boatnumber: '72',
    p1name: 'Paul Tomblin',
    p1addr2: 'Rochester/NY',
    p2name: '',
    p2addr2: ''
  },
  {
    category: 'Kayak K-1 Unlimited Over 50 Male',
    result: '01:22:21',
    position: '2',
    behindLeader: '00:02:20',
    behindPrev: '00:02:20',
    boatnumber: '1',
    p1name: 'Mike Finear',
    p1addr2: 'Rochester/NY',
    p2name: '',
    p2addr2: ''

  }
];

export class AllResults extends Component {
  componentDidMount () {
    $(this.refs.main).DataTable({
      dom: '<"data-table-wrapper"t>B',
      destroy: true,
      select: true,
      rowGroup: {
        dataSrc: 'category'
      },
      orderFixed: [
        [0, 'asc']
      ],
      data: data,
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
  }

  componentWillUnmount () {
    $('.data-table-wrapper')
      .find('table')
      .DataTable()
      .destroy(true);
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>
        <Table striped bordered id='results-table' ref='main' />
        <Row ref='button_row' />
      </div>
    );
  }
}
