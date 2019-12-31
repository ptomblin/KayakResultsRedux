import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PleaseWait } from '../PleaseWait';
import { STATE_TRUE } from '../configureDB';

import { endEditingRaceEntry, getEntryByBoatNumber } from '../actions/raceEntriesAction';

const defaultMatch = {
  boatnumber: '',
  result: '',
  boatcategory: '',
  boatclass: '',
  p1name: '',
  p2name: ''
};

export class AddResult extends Component {
  constructor (props) {
    super(props);
    this.state = { validated: false, result: '' };
  }

  componentDidMount () {
    this.props.onEntry(this.props.entry_boat_number);
    this.setState({ validated: false, result: '' });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fetching_status !== this.props.fetching_status && this.props.fetching_status === STATE_TRUE) {
      this.setState({ result: this.props.match.result });
    }
  }

  onResultChange (val) {
    this.setState({ result: val });
  }

  render () {
    if (this.props.config_status !== STATE_TRUE) {
      return <PleaseWait />;
    }

    const invalidBoatNumber = this.props.match.boatnumber === defaultMatch.boatnumber;

    const invalidResult = this.state.result === '';

    const anyInvalid = invalidBoatNumber || invalidResult;

    const extraClass = invalidBoatNumber ? '' : 'readonly-highlight';
    console.log('anyInvalid = ' + anyInvalid);

    return (
      <div>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Boat Number
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type='text'
                key='boat-number'
                placeholder='Boat#'
                value={this.props.editing_boat_number}
                isInvalid={invalidBoatNumber}
                onChange={e => this.props.onBoatNumberChange(e.target.value)}
              />
            </Col>
            <Form.Label column sm={2}>
            Result
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                placeholder='Time'
                key='result'
                isInvalid={this.state.validated && invalidResult}
                value={this.state.result}
                onChange={e => this.onResultChange(e.target.value)}
              />
            </Col>
            <Col sm={4}>
              <Button
                variant='primary'
                onClick={() => {
                  if (anyInvalid) {
                    return this.setState({ validated: true });
                  } else {
                    this.setState({ validated: false, result: '' });
                    return this.props.handleSave({ ...this.props.match, result: this.state.result }, this.props.editing_boat_number);
                  }
                }}
              >Save Result
              </Button>
              <Button variant='warning'>Clear Result</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={1}>
            Category
            </Form.Label>
            <Col sm={2}>
              <Form.Control type='text' key='category' plaintext readOnly value={this.props.match.boatcategory} className={extraClass} />
            </Col>
            <Form.Label column sm={1}>
            Class
            </Form.Label>
            <Col sm={2}>
              <Form.Control type='text' key='class' plaintext readOnly value={this.props.match.boatclass} className={extraClass} />
            </Col>
            <Form.Label column sm={1}>
            Person 1
            </Form.Label>
            <Col sm={2}>
              <Form.Control type='text' key='p1name' plaintext readOnly value={this.props.match.p1name} className={extraClass} />
            </Col>
            <Form.Label column sm={1}>
            Person 2
            </Form.Label>
            <Col sm={2}>
              <Form.Control type='text' key='p2name' plaintext readOnly value={this.props.match.p2name} className={extraClass} />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const matches = state.raceEntriesReducer.matches;
  const currentMatch = (!matches || matches.length !== 1) ? defaultMatch : matches[0];
  return {
    entry_boat_number: ownProps.match.params.boatNumber,
    fetching_status: state.raceEntriesReducer.fetching_status,
    match: currentMatch,
    editing_boat_number: !state.raceEntriesReducer.boat_number || state.raceEntriesReducer.boat_number === '0' ? '' : state.raceEntriesReducer.boat_number,
    config_status: state.configReducer.config_found
  };
};

const mapDispatchToProps = dispatch => ({
  handleSave: (entry, boatNumber) => {
    dispatch(endEditingRaceEntry(entry))
      .then(() => {
        if (boatNumber !== '0') {
          dispatch(push('/results'));
        } else {
          dispatch(getEntryByBoatNumber('0'));
        }
      });
  },
  onEntry: (boatNumber) => {
    dispatch(getEntryByBoatNumber(boatNumber));
  },
  handleReset: (boatNumber) => {
    dispatch(getEntryByBoatNumber(boatNumber));
  },
  // handleCrewReset: (fieldValues) => {
  //   dispatch(changeRaceEntryFields(fieldValues));
  // },
  onBoatNumberChange: (boatNumber) => {
    dispatch(getEntryByBoatNumber(boatNumber));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddResult);
