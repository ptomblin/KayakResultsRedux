import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Alert from 'react-bootstrap/Alert';

import { EntryForm } from './entryForm/EntryForm';
import { AllEntries } from './allEntries/AllEntries';
import { AddResult } from './addResult/AddResult';
import { AllResults } from './allResults/AllResults';
import { PleaseWait } from './PleaseWait';
import { STATE_PENDING, STATE_FALSE, STATE_ERROR } from './configureDB';
import RaceConfiguration from './raceConfiguration/RaceConfiguration';

class App extends Component {
  render () {
    const hasMessage = !!this.props.error_message;
    const coverClass = ''; // hasMessage ? 'coverUp' : '';
    if (this.props.config_found === STATE_PENDING) {
      return <PleaseWait />;
    }

    return (
      <Router>
        <div>
          <Alert variant='danger' show={hasMessage}>{this.props.error_message}</Alert>
          <Navbar variant='dark' bg='dark' className={coverClass}>
            <Navbar.Brand as={NavLink} to='/' exact>
              {this.props.title}
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={NavLink} to='/' exact>
              All Entries
              </Nav.Link>
              <Nav.Link as={NavLink} to='/entry/:entryId' exact>
              Entry Form
              </Nav.Link>
              <Nav.Link as={NavLink} to='/results' exact>
              All Results
              </Nav.Link>
              <Nav.Link as={NavLink} to='/result/:entryId' exact>
              Add Result
              </Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              <Nav.Link as={NavLink} to='/raceConfiguration' exact>
                Race Configuration
              </Nav.Link>
              <Nav.Link as={NavLink} to='/login' exact>
                Login/Register
              </Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route path='/' exact component={AllEntries} />
            <Route path='/entry/:entryId' exact component={EntryForm} />
            <Route path='/results' exact component={AllResults} />
            <Route path='/result/:entryId' exact component={AddResult} />
            <Route path='/raceConfiguration' exact component={RaceConfiguration} />
            <Route component={PleaseWait} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    config_found: state.appReducer.config_found,
    config: state.appReducer.config,
    title: state.appReducer.config.race_name || 'Race Entries/Results',
    error_message: state.pouchErrorReducer.error_message
  };
};
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
