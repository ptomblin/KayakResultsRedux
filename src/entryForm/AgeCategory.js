import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class AgeCategory extends Component {
  render () {
    const ageCategories = ['Under 50', 'Over 50', 'Mixed'];

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Age Categories
        </Form.Label>
        <Col sm={10}>
          {ageCategories.map(ag => (
            <Form.Check inline key={ag} label={ag} type='radio' name='age-category' />
          ))}
        </Col>
      </Form.Group>
    );
  }
}
