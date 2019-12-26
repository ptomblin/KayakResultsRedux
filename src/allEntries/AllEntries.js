import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

const $ = require('jquery');
$.DataTable = require('datatables.net-buttons-bs4');
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
require('datatables.net-buttons/js/buttons.html5.js')();
require('datatables.net-buttons/js/buttons.print.js')();
require('datatables.net-rowgroup-bs4');

const columns = [
  { title: 'Category', data: 'category', visible: false },
  { title: 'Boat #', data: 'boatnumber', className: 'fixedTable', width: '2em' },
  { title: 'Name 1', data: 'p1name', width: '25%' },
  { title: 'Addr 1', data: 'p1addr2', width: '15%' },
  { title: 'Name 2', data: 'p2name', width: '25%' },
  { title: 'Addr 2', data: 'p2addr2', width: '15%' }
];

// test only:
const data = [
  {
    category: 'Kayak K-1 Unlimited Over 50 Male',
    boatnumber: '72',
    p1name: 'Paul Tomblin',
    p1addr2: 'Rochester/NY',
    p2name: '',
    p2addr2: ''
  },
  {
    category: 'Kayak K-1 Unlimited Over 50 Male',
    boatnumber: '1',
    p1name: 'Mike Finear',
    p1addr2: 'Rochester/NY',
    p2name: '',
    p2addr2: ''
  },
  {
    category: 'Kayak K-2 Mixed Male',
    boatnumber: 'k2-2',
    p1name: 'Paddler 1',
    p1addr2: 'Rochester/NY',
    p2name: 'Paddler 2',
    p2addr2: ''

  }
];

export class AllEntries extends Component {
  componentDidMount () {
    $(this.refs.main).DataTable({
      dom: '<"data-table-wrapper"t>pB',
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
        <Table striped bordered id='entries-table' ref='main' />
      </div>
    );
  }
}
