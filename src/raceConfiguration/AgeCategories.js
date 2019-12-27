import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

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
              <div className='d-flex'><div className='flex-grow-1'>{ag}</div><div><FontAwesomeIcon icon={faMinusCircle} /></div></div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <FontAwesomeIcon className='ml-auto' icon={faPlusCircle} /> Add New Age Category
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AgeCategories);
