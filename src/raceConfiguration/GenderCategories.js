import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

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
              <div className='d-flex'><div className='flex-grow-1'>{gc}</div><div><FontAwesomeIcon icon={faMinusCircle} /></div></div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <FontAwesomeIcon className='ml-auto' icon={faPlusCircle} /> Add New Gender Category
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GenderCategories);
