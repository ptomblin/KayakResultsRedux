import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { changeRaceEntryField } from '../actions/raceEntriesAction';

export class BoatCategory extends Component {
  makeCategory (cat, cls) {
    return cls.map((cl) => (
      <Form.Check
        inline
        type='radio'
        label={cl.Name}
        key={cl.Name}
        name='boat-classes'
        checked={cl.Name === this.props.entry.boatclass && cat === this.props.entry.boatcategory}
        onChange={e => e.target.checked && this.props.onChange(cat, cl.Name)}
      />
    ));
  }

  render () {
    const categories = this.props.boat_categories.map((cat) =>
      <Row key={cat.category}>
        <Form.Label column sm={2}>{cat.category}</Form.Label>
        {this.makeCategory(cat.category, cat.classes)}
      </Row>
    );

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Boat Class
        </Form.Label>
        <Col sm={10}>
          {categories}
        </Col>
      </Form.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entry: state.raceEntriesReducer.entry,
    boat_categories: state.configReducer.config.boat_categories,
    hasCrew: ownProps.hasCrew
  };
};
const mapDispatchToProps = dispatch => ({
  onChange: (cat, cls) => {
    dispatch(changeRaceEntryField('boatcategory', cat));
    dispatch(changeRaceEntryField('boatclass', cls));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoatCategory);
