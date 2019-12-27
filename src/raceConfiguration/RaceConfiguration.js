import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { STATE_PENDING } from '../configureDB';
import { PleaseWait } from '../PleaseWait';
import AgeCategories from './AgeCategories';
import GenderCategories from './GenderCategories';
import BoatClasses from './BoatClasses';
import { fetchConfig, saveConfig } from '../actions/configAction';

class RaceConfiguration extends Component {
  render () {
    if (this.props.config_found === STATE_PENDING) {
      return <PleaseWait />;
    }

    return (
      <div>
        <h1>Race Configuration</h1>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Race Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control type='text' placeholder='Race Name' defaultValue={this.props.config.race_name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Race Date
            </Form.Label>
            <Col sm={8}>
              <Form.Control type='text' placeholder='Race Date' defaultValue={this.props.config.race_date} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
            Race Director
            </Form.Label>
            <Col sm={8}>
              <Form.Control type='text' plaintext readOnly value={this.props.config.race_director} />
            </Col>
          </Form.Group>
          <AgeCategories />
          <GenderCategories />
          <BoatClasses />
          <Form.Group as={Row}>
            <Col sm={10}>
              <Button
                variant='primary' onClick={() => {
                  this.props.onSaveClick(this.props.config);
                }}
              >Save Configuration
              </Button>
              <Button
                variant='warning' onClick={() => {
                  this.props.onResetClick();
                }}
              >Reset to Defaults
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    config_found: state.configReducer.config_found,
    config: state.configReducer.config,
    title: state.configReducer.config.race_name || 'Race Entries/Results'
  };
};
const mapDispatchToProps = dispatch => ({
  onSaveClick: (config) => {
    dispatch(saveConfig(config));
  },
  onResetClick: () => {
    dispatch(fetchConfig());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RaceConfiguration);
