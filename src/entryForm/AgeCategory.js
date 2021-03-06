import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { changeRaceEntryField } from '../actions/raceEntriesAction';

export class AgeCategory extends Component {
  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Age Categories
        </Form.Label>
        <Col sm={10}>
          {this.props.age_categories.map(ag => (
            <Form.Check
              inline
              key={ag.Name}
              label={ag.Name}
              type='radio'
              name='age-category'
              disabled={!this.props.hasCrew && ag.forCrew}
              checked={ag.Name === this.props.entry.agecategory}
              onChange={e => e.target.checked && this.props.onChange(ag.Name)}
              isInvalid={this.props.isInvalid}
            />
          ))}
        </Col>
      </Form.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entry: state.raceEntriesReducer.entry,
    age_categories: state.configReducer.config.age_categories,
    hasCrew: ownProps.hasCrew,
    isInvalid: ownProps.isInvalid
  };
};
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch(changeRaceEntryField('agecategory', value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AgeCategory);
