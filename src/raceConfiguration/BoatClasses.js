import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeEntryFromBoatCategoryConfig, addEntryToBoatCategoryConfig, removeEntryFromBoatClassConfig, addEntryToBoatClassConfig } from '../actions/configAction';

class BoatClasses extends Component {
  constructor (props) {
    super(props);
    this.boatClassValues = {};
  }

  setBoatClass (category, value) {
    this.boatClassValues[category] = value;
    console.log(this.boatClassValues);
  }

  boatClass (boatCategory) {
    return (
      boatCategory.classes.map(bclass => (
        <ListGroup.Item key={bclass.Name}>
          <div className='d-flex'>
            <div className='flex-grow-1'>{bclass.Name}</div>
            <div>
              <FontAwesomeIcon
                icon={faMinusCircle}
                onClick={() => {
                  this.props.onRemoveClass(boatCategory.category, bclass.Name);
                }}
              />
            </div>
          </div>
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
          {this.props.boat_categories.map(bcat => (
            <ListGroup.Item key={bcat.category}>
              <div className='d-flex'>
                <div className='flex-fill'>{bcat.category}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    onClick={() => {
                      this.props.onRemoveCategory(bcat.category);
                    }}
                  />
                </div>
                <ListGroup className='flex-grow-1'>
                  {this.boatClass(bcat)}
                  <ListGroup.Item key='add'>
                    <Form.Row>
                      <Col>
                        <Form.Control
                          placeholder='New Boat Class'
                          onChange={e => this.setBoatClass(bcat.category, e.target.value)}
                          ref={bcat.category}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant='primary'
                          onClick={() => {
                            this.props.onAddClass(bcat.category, this.refs[bcat.category].value);
                            this.refs[bcat.category].value = '';
                          }}
                        >Add New Boat Class
                        </Button>
                      </Col>
                    </Form.Row>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item key='add'>
            <Form.Row>
              <Col>
                <Form.Control placeholder='New Boat Category' ref='newCategory' />
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => {
                    this.props.onAddCategory(this.refs.newCategory.value);
                    this.refs.newCategory.value = '';
                  }}
                >Add New Boat Category
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
    boat_categories: state.configReducer.config.boat_categories
  };
};
const mapDispatchToProps = dispatch => ({
  onRemoveCategory: (key) => {
    dispatch(removeEntryFromBoatCategoryConfig(key));
  },
  onAddCategory: (val) => {
    dispatch(addEntryToBoatCategoryConfig(val));
  },
  onRemoveClass: (category, key) => {
    dispatch(removeEntryFromBoatClassConfig(category, key));
  },
  onAddClass: (category, val) => {
    dispatch(addEntryToBoatClassConfig(category, val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoatClasses);
