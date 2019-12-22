import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class BoatCategory extends Component {
  makeCategory (cls) {
    return cls.map((cl) => (
      <Form.Check
        inline
        type='radio'
        label={cl.Name}
        key={cl.Name}
        name='boat-classes'
      />
    ));
  }

  render () {
    const boat_categories = [
      {
        category: 'Guideboat',
        classes: [
          {
            Name: '1 Person',
            hasCrew: false
          },
          {
            Name: '2 Person',
            hasCrew: true
          },
          {
            Name: 'Open Touring',
            hasCrew: false
          }
        ]
      },
      {
        category: 'Kayak',
        classes: [
          {
            Name: 'Recreational',
            hasCrew: false
          },
          {
            Name: 'K-1 Touring',
            hasCrew: false
          },
          {
            Name: 'K-1 Unlimited',
            hasCrew: false
          },
          {
            Name: 'K-2 Double Kayak',
            hasCrew: true
          }
        ]
      },
      {
        category: 'Canoe',
        classes: [
          {
            Name: 'Solo Recreational',
            hasCrew: false
          },
          {
            Name: 'Double Recreational',
            hasCrew: true
          },
          {
            Name: 'C-1 Stock',
            hasCrew: false
          },
          {
            Name: 'C-2 Stock',
            hasCrew: true
          },
          {
            Name: 'C-2 Amateur',
            hasCrew: true
          },
          {
            Name: 'C-4 Stock',
            hasCrew: true
          },
          {
            Name: 'Voyageur',
            hasCrew: true
          }
        ]
      },
      {
        category: 'SUP',
        classes: [
          {
            Name: '12\' 6" Class',
            hasCrew: false
          },
          {
            Name: '14\' Class',
            hasCrew: false
          }
        ]
      }
    ];

    const categories = boat_categories.map((cat) =>
      <Row key={cat.category}>
        <Form.Label column sm={2}>{cat.category}</Form.Label>
        {this.makeCategory(cat.classes)}
      </Row>
    );

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Boat Class
        </Form.Label>
        <Col sm={10}>
          {categories}
        </Col>
      </Form.Group>
    );
  }
}
