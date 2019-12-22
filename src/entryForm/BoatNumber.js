import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class BoatNumber extends Component {
  // Make sure the number isn't in use if this is a new one.
  render () {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Boat Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control placeholder='Boat Number' />
        </Col>
      </Form.Group>
    );
  }
}
