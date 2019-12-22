import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

/* Need to make value and className programatic on the readOnly fields */
export class AddResult extends Component {
  render () {
    const values = {
      category: 'Kayak',
      class: 'K-1 Unlimited',
      p1name: 'Paul Tomblin',
      p2name: ''
    };
    const extraClass = 'readonly-highlight';

    return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Boat Number
          </Form.Label>
          <Col sm={2}>
            <Form.Control type='text' placeholder='Boat#' />
          </Col>
          <Form.Label column sm={2}>
            Result
          </Form.Label>
          <Col sm={2}>
            <Form.Control type='text' placeholder='Time' />
          </Col>
          <Col sm={4}>
            <Button variant='primary'>Save Result</Button>
            <Button variant='warning'>Clear Result</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            Category
          </Form.Label>
          <Col sm={2}>
            <Form.Control type='text' plaintext readOnly value={values.category} className={extraClass} />
          </Col>
          <Form.Label column sm={1}>
            Class
          </Form.Label>
          <Col sm={2}>
            <Form.Control type='text' plaintext readOnly value={values.class} className={extraClass} />
          </Col>
          <Form.Label column sm={1}>
            Person 1
          </Form.Label>
          <Col sm={2}>
            <Form.Control type='text' plaintext readOnly value={values.p1name} className={extraClass} />
          </Col>
          <Form.Label column sm={1}>
            Person 2
          </Form.Label>
          <Col sm={2}>
            <Form.Control type='text' plaintext readOnly value={values.p2name} className={extraClass} />
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
