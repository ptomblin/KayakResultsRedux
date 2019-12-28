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
  constructor (props) {
    super(props);
    this.state = { new_age_category: '' };
  }

  setAgeCategory (value) {
    this.setState({ new_age_category: value });
  }

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
                      this.props.onRemoveCategory(ag);
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
                  placeholder='New Age Category'
                  onChange={e => this.setAgeCategory(e.target.value)}
                  value={this.state.new_age_category}
                />
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={() => {
                    this.props.onAddCategory(this.state.new_age_category);
                    this.setAgeCategory('');
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
  onRemoveCategory: (key) => {
    dispatch(removeEntryFromAgeCategoryConfig(key));
  },
  onAddCategory: (val) => {
    dispatch(addEntryToAgeCategoryConfig(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AgeCategories);
