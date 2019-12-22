import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class GenderCategory extends Component {
  render () {
    const genderCategories = ['Male', 'Female', 'Mixed'];

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Gender Categories
        </Form.Label>
        <Col sm={10}>
          {genderCategories.map(ag => (
            <Form.Check inline key={ag} label={ag} type='radio' name='gender-category' />
          ))}
        </Col>
      </Form.Group>
    );
  }
}
