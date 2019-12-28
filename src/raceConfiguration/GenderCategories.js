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
  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Gender Categories
        </Form.Label>
        <ListGroup>
          {this.props.gender_categories.map(gc => (
            <ListGroup.Item key={gc}>
              <div className='d-flex'><div className='flex-grow-1'>{gc}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    onClick={() => {
                      this.props.onRemoveKey(gc);
                    }}
                  />
                </div>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <Form.Row>
              <Col>
                <Form.Control placeholder='New Gender Category' ref='new' />
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => {
                    this.props.onAddKey(this.refs.new.value);
                    this.refs.new.value = '';
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
  onAddKey: (val) => {
    dispatch(addEntryToGenderCategoryConfig(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenderCategories);
