import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PleaseWait } from '../PleaseWait';
import { STATE_PENDING } from '../configureDB';

import { startEditingRaceEntry, changeRaceEntryField, endEditingRaceEntry } from '../actions/raceEntriesAction';

import AgeCategory from './AgeCategory';
import GenderCategory from './GenderCategory';
import BoatNumber from './BoatNumber';
import BoatCategory from './BoatCategory';

export class EntryForm extends Component {
  componentDidMount () {
    this.props.onEntry(this.props.entry_id);
  }

  render () {
    if (this.props.editing_status === STATE_PENDING) {
      return <PleaseWait />;
    }

    let hasCrew = true;
    if (this.props.entry.boatcategory !== '' && this.props.entry.boatclass !== '') {
      const bcat = this.props.config.boat_categories.find(bc => bc.category === this.props.entry.boatcategory);
      const bclass = bcat && bcat.classes.find(bc => bc.Name === this.props.entry.boatclass);
      hasCrew = bclass ? bclass.hasCrew : true;
    }
    return (
      <div>
        <Form>
          <Row>
            <Col sm={6}>Boat Captain</Col>
            <Col sm={6}>Crew Members</Col>
          </Row>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                placeholder="Captain's name"
                value={this.props.entry.p1name}
                onChange={e => this.props.onChange('p1name', e.target.value)}
              />
            </Col>
            <Form.Label column sm={2}>
            Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                placeholder='Crew Name(s)'
                value={this.props.entry.p2name}
                disabled={!hasCrew}
                onChange={e => this.props.onChange('p2name', e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Home Town/State
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                placeholder="Captain's Town/State"
                value={this.props.entry.p1addr2}
                onChange={e => this.props.onChange('p1addr2', e.target.value)}
              />
            </Col>
            <Form.Label column sm={2}>
            Town/State
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                placeholder='Crew Town/State'
                disabled={!hasCrew}
                value={this.props.entry.p2addr2}
                onChange={e => this.props.onChange('p2addr2', e.target.value)}
              />
            </Col>
          </Form.Group>
          <BoatNumber />
          <AgeCategory hasCrew={hasCrew} />
          <GenderCategory hasCrew={hasCrew} />
          <BoatCategory />
          <Form.Group as={Row}>
            <Col sm={10}>
              <Button
                variant='primary'
                onClick={() => this.props.handleSave({ ...this.props.entry })}
              >Save Entry
              </Button>
              <Button variant='danger'>Delete Entry</Button>
              <Button variant='warning'>Clear Entry</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entry_id: ownProps.match.params.entryId,
    entry: state.raceEntriesReducer.entry,
    editing_status: state.raceEntriesReducer.editing_status,
    config: state.configReducer.config
  };
};
const mapDispatchToProps = dispatch => ({
  onEntry: (entryId) => {
    dispatch(startEditingRaceEntry(entryId));
  },
  onChange: (fieldName, value) => {
    dispatch(changeRaceEntryField(fieldName, value));
  },
  handleSave: (entry) => {
    console.log('handleSave');
    dispatch(endEditingRaceEntry(entry));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
