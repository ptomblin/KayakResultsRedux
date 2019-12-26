import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { AgeCategory } from './AgeCategory';
import { GenderCategory } from './GenderCategory';
import { BoatNumber } from './BoatNumber';
import { BoatCategory } from './BoatCategory';

export class EntryForm extends Component {
  render () {
    return (
      <Form>
        <Row>
          <Col sm={6}>Boat Captain</Col>
          <Col sm={6}>Crew Members</Col>
        </Row>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={4}>
            <Form.Control type='text' placeholder="Captain's name" />
          </Col>
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={4}>
            <Form.Control type='text' placeholder='Crew Name(s)' />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Home Town/State
          </Form.Label>
          <Col sm={4}>
            <Form.Control type='text' placeholder="Captain's Town/State" />
          </Col>
          <Form.Label column sm={2}>
            Town/State
          </Form.Label>
          <Col sm={4}>
            <Form.Control type='text' placeholder='Crew Town/State' />
          </Col>
        </Form.Group>
        <BoatNumber />
        <AgeCategory />
        <GenderCategory />
        <BoatCategory />
        <Form.Group as={Row}>
          <Col sm={10}>
            <Button variant='primary'>Save Entry</Button>
            <Button variant='danger'>Delete Entry</Button>
            <Button variant='warning'>Clear Entry</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
