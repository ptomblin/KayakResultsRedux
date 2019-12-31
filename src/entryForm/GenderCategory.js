import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { changeRaceEntryField } from '../actions/raceEntriesAction';

export class GenderCategory extends Component {
  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Gender Categories
        </Form.Label>
        <Col sm={10}>
          {this.props.gender_categories.map(ag => (
            <Form.Check
              inline
              key={ag}
              label={ag}
              type='radio'
              name='gender-category'
              checked={ag === this.props.entry.gendercategory}
              onChange={e => e.target.checked && this.props.onChange(ag)}
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
    gender_categories: state.configReducer.config.gender_categories,
    hasCrew: ownProps.hasCrew,
    isInvalid: ownProps.isInvalid
  };
};
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch(changeRaceEntryField('gendercategory', value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenderCategory);
