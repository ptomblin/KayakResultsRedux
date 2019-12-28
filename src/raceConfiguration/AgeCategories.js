import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeEntryFromAgeCategoryConfig, addEntryToAgeCategoryConfig } from '../actions/configAction';

class AgeCategories extends Component {
  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Age Categories
        </Form.Label>
        <ListGroup>
          {this.props.age_categories.map(ag => (
            <ListGroup.Item key={ag}>
              <div className='d-flex'><div className='flex-grow-1'>{ag}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    onClick={() => {
                      this.props.onRemoveKey(ag);
                    }}
                  />
                </div>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <Form.Row>
              <Col>
                <Form.Control placeholder='New Age Category' ref='new' />
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => {
                    this.props.onAddKey(this.refs.new.value);
                    this.refs.new.value = '';
                  }}
                >Add New Age Category
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
    age_categories: state.configReducer.config.age_categories
  };
};
const mapDispatchToProps = dispatch => ({
  onRemoveKey: (key) => {
    dispatch(removeEntryFromAgeCategoryConfig(key));
  },
  onAddKey: (val) => {
    dispatch(addEntryToAgeCategoryConfig(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AgeCategories);
