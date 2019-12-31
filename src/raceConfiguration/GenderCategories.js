import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeEntryFromGenderCategoryConfig, addEntryToGenderCategoryConfig } from '../actions/configAction';

class GenderCategories extends Component {
  constructor (props) {
    super(props);
    this.state = { new_gender_category: { Name: '', forCrew: false } };
  }

  setGenderCategory (value) {
    this.setState({ new_gender_category: { ...this.state.new_gender_category, Name: value } });
  }

  setGenderCrew (value) {
    this.setState({ new_gender_category: { ...this.state.new_gender_category, forCrew: value } });
  }

  setGenderCat (name, forCrew) {
    this.setState({ new_gender_category: { Name: name, forCrew: forCrew } });
  }

  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Gender Categories
        </Form.Label>
        <ListGroup>
          {this.props.gender_categories.map(gc => (
            <ListGroup.Item key={gc.Name}>
              <div className='d-flex'>
                <div className='flex-grow-1'>{gc.Name}</div>
                <div><Form.Check checked={gc.forCrew} label='For Crew' disabled /></div>
                <div>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    onClick={() => {
                      this.props.onRemoveCategory(gc);
                    }}
                  />
                </div>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder='New Gender Category'
                  onChange={e => this.setGenderCategory(e.target.value)}
                  value={this.state.new_gender_category.Name}
                />
              </Col>
              <Col sm={2}>
                <Form.Check
                  label='For Crew'
                  inline
                  type='checkbox'
                  onChange={e => this.setGenderCrew(e.target.checked)}
                  checked={this.state.new_gender_category.forCrew}
                />
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => {
                    this.props.onAddCategory(this.state.new_gender_category);
                    this.setGenderCat('', false);
                  }}
                >Add New Gender Category
                </Button>
              </Col>
            </Form.Row>
          </ListGroup.Item>
        </ListGroup>
      </Form.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gender_categories: state.configReducer.config.gender_categories
  };
};
const mapDispatchToProps = dispatch => ({
  onRemoveCategory: (key) => {
    dispatch(removeEntryFromGenderCategoryConfig(key));
  },
  onAddCategory: (val) => {
    dispatch(addEntryToGenderCategoryConfig(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenderCategories);
