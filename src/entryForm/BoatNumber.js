import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { changeRaceEntryField, getEntryByBoatNumber } from '../actions/raceEntriesAction';

export class BoatNumber extends Component {
  // Make sure the number isn't in use if this is a new one.
  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Boat Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            placeholder='Boat Number'
            value={this.props.entry.boatnumber}
            onChange={e => this.props.onChange(e.target.value)}
            isInvalid={this.props.isInvalid}
          />
        </Col>
      </Form.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entry: state.raceEntriesReducer.entry,
    matches: state.raceEntriesReducer.matches,
    isInvalid: ownProps.isInvalid
  };
};
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch(changeRaceEntryField('boatnumber', value));
    dispatch(getEntryByBoatNumber(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoatNumber);
