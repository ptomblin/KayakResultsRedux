import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PleaseWait } from '../PleaseWait';
import { STATE_PENDING } from '../configureDB';

import { startEditingRaceEntry, changeRaceEntryField, endEditingRaceEntry, deleteEntry } from '../actions/raceEntriesAction';

import AgeCategory from './AgeCategory';
import GenderCategory from './GenderCategory';
import BoatNumber from './BoatNumber';
import BoatCategory from './BoatCategory';

export class EntryForm extends Component {
  constructor (props) {
    super(props);
    this.state = { validated: false };
  }

  componentDidMount () {
    this.props.onEntry(this.props.entry_id);
    this.setState({ validated: false });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.entry_id !== this.props.entry_id) {
      this.props.handleReset(this.props.entry_id);
    }
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

    const invalidP1Name = this.props.entry.p1name === '';
    const invalidP2Name = hasCrew ? this.props.entry.p2name === '' : this.props.entry.p2name !== '';
    const invalidP1Addr = this.props.entry.p2name === '';

    const invalidBoatNumber = this.props.matches && this.props.matches.length === 1 && this.props.matches[0]._id !== this.props.entry._id;

    const invalidAgeCategory = this.props.entry.agecategory !== '';
    const invalidGenderCategory = this.props.entry.gendercategory !== '';
    const invalidBoatClass = this.props.entry.boatclass !== '';

    const anyInvalid = invalidP1Name || invalidP2Name || invalidP1Addr || invalidBoatNumber || this.props.entry.boatnumber || invalidAgeCategory || invalidGenderCategory || invalidBoatClass;

    const allowDelete = this.props.entry_id !== '0';

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
                isInvalid={this.state.validated && invalidP1Name}
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
                isInvalid={this.state.validated && invalidP2Name}
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
                isInvalid={this.state.validated && invalidP1Addr}
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
          <BoatNumber isInvalid={invalidBoatNumber || (this.state.validated && this.props.entry.boatnumber === '')} />
          <AgeCategory hasCrew={hasCrew} isInvalid={this.state.validated && invalidAgeCategory} />
          <GenderCategory hasCrew={hasCrew} isInvalid={this.state.validated && invalidGenderCategory} />
          <BoatCategory />
          <Form.Group as={Row}>
            <Col sm={10}>
              <Button
                variant='primary'
                onClick={() => {
                  if (anyInvalid) {
                    return this.setState({ validated: true });
                  } else {
                    this.setState({ validated: false });
                    return this.props.handleSave({ ...this.props.entry }, this.props.entry_id);
                  }
                }}
              >Save Entry
              </Button>
              <Button
                variant='danger'
                disabled={!allowDelete}
                onClick={() => this.props.handleDelete(this.props.entry)}
              >Delete Entry
              </Button>
              <Button
                variant='warning'
                onClick={() => this.props.handleReset(this.props.entry_id)}
              >Clear Entry
              </Button>
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
    config: state.configReducer.config,
    matches: state.raceEntriesReducer.matches
  };
};
const mapDispatchToProps = dispatch => ({
  onEntry: (entryId) => {
    dispatch(startEditingRaceEntry(entryId));
  },
  onChange: (fieldName, value) => {
    dispatch(changeRaceEntryField(fieldName, value));
  },
  handleSave: (entry, entryId) => {
    dispatch(endEditingRaceEntry(entry))
      .then(() => {
        if (entryId !== '0') {
          dispatch(push('/'));
        } else {
          dispatch(startEditingRaceEntry(entryId));
        }
      });
  },
  handleDelete: (entry) => {
    dispatch(deleteEntry(entry));
    dispatch(push('/'));
  },
  handleReset: (entryId) => {
    dispatch(startEditingRaceEntry(entryId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
