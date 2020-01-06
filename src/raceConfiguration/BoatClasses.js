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
    // believe it or not, looping is faster than Array.reduce!
    const bcats = {};
    for (var i = 0; i < this.props.boat_categories.length; i++) {
      bcats[this.props.boat_categories[i].category] = { Name: '', hasCrew: false };
    }
    this.state = { new_boat_categories: '', new_boat_classes: bcats };
  }

  setBoatClassName (category, value) {
    const valStruct = { ...this.state.new_boat_classes[category], Name: value };
    this.setState({ new_boat_classes: { ...this.state.new_boat_classes, [category]: valStruct } });
  }

  setBoatClassCrew (category, checked) {
    const valStruct = { ...this.state.new_boat_classes[category], hasCrew: checked };
    this.setState({ new_boat_classes: { ...this.state.new_boat_classes, [category]: valStruct } });
  }

  resetBoatClass (category) {
    const valStruct = { Name: '', hasCrew: false };
    this.setState({ new_boat_classes: { ...this.state.new_boat_classes, [category]: valStruct } });
  }

  setBoatCategory (value) {
    this.setState({ new_boat_categories: value });
  }

  boatClass (boatCategory) {
    return (
      boatCategory.classes.map(bclass => (
        <ListGroup.Item key={bclass.Name}>
          <div className='d-flex'>
            <div className='flex-grow-1'>{bclass.Name}</div>
            <div><Form.Check checked={bclass.hasCrew} label='Has Crew' disabled /></div>
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
        <ListGroup className='col-sm-9'>
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
                          onChange={e => this.setBoatClassName(bcat.category, e.target.value)}
                          value={this.state.new_boat_classes[bcat.category].Name}
                        />
                      </Col>
                      <Col sm={2}>
                        <Form.Check
                          label='Has Crew'
                          inline
                          type='checkbox'
                          onChange={e => this.setBoatClassCrew(bcat.category, e.target.checked)}
                          checked={this.state.new_boat_classes[bcat.category].hasCrew}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant='primary'
                          onClick={() => {
                            this.props.onAddClass(bcat.category, this.state.new_boat_classes[bcat.category]);
                            this.resetBoatClass(bcat.category);
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
                <Form.Control
                  placeholder='New Boat Category'
                  onChange={e => this.setBoatCategory(e.target.value)}
                  value={this.state.new_boat_categories}
                />
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => {
                    this.props.onAddCategory(this.state.new_boat_categories);
                    this.resetBoatClass(this.state.new_boat_categories);
                    this.setBoatCategory('');
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
