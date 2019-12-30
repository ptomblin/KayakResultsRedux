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
              key={ag}
              label={ag}
              type='radio'
              name='age-category'
              checked={ag === this.props.entry.agecategory}
              onChange={e => e.target.checked && this.props.onChange(ag)}
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
    hasCrew: ownProps.hasCrew
  };
};
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch(changeRaceEntryField('agecategory', value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AgeCategory);
