import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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

export class AllEntries extends Component {
  constructor (props) {
    super(props);
    this.tbl = null;
    this.onClick.bind(this);
  }

  onClick (e) {
    this.props.onClick(this.tbl.row(e.target).data()._id);
  }

  componentDidMount () {
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
      data: this.props.entries,
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
  }

  componentWillUnmount () {
    this.tbl.destroy(true);
    this.tbl = null;
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

const mapStateToProps = (state, ownProps) => {
  return {
    entries: state.raceEntriesReducer.entries
  };
};
const mapDispatchToProps = dispatch => ({
  onClick: (id) => {
    dispatch(push('/entry/' + id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllEntries);
