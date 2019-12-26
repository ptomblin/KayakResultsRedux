import React, { Component } from 'react';
import { Jumbotron, Spinner, Row } from 'react-bootstrap';

export class PleaseWait extends Component {
  render () {
    return (
      <Jumbotron>
        <h2>Please Wait</h2>
        <Spinner animation='border' role='status' />
        <Row>
          Loading Required Configuration
        </Row>
      </Jumbotron>
    );
  }
}
