import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

class BoatClasses extends Component {
  boatClass (boatCategory) {
    return (
      boatCategory.classes.map(bclass => (
        <ListGroup.Item key={bclass.Name}>
          <div className='d-flex'><div className='flex-grow-1'>{bclass.Name}</div><div><FontAwesomeIcon icon={faMinusCircle} /></div></div>
        </ListGroup.Item>
      ))
    );
  }

  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Boat Classes
        </Form.Label>
        <ListGroup className='col-sm-8'>
          {this.props.boat_classes.map(bcat => (
            <ListGroup.Item key={bcat.category}>
              <div className='d-flex'><div className='flex-fill'>{bcat.category}</div><div><FontAwesomeIcon icon={faMinusCircle} /></div>
                <ListGroup className='flex-grow-1'>
                  {this.boatClass(bcat)}
                  <ListGroup.Item key='add'>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add New Boat Class
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <FontAwesomeIcon className='ml-auto' icon={faPlusCircle} /> Add New Boat Category
          </ListGroup.Item>
        </ListGroup>
      </Form.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boat_classes: state.configReducer.config.boat_classes
  };
};
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BoatClasses);
