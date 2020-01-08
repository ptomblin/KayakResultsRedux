import React, { Component } from 'react';
import {
  NavLink,
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';

import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Alert from 'react-bootstrap/Alert';

import EntryForm from './entryForm/EntryForm';
import AllEntriesWrapper from './allEntries/AllEntriesWrapper';
import AllResultsWrapper from './allResults/AllResultsWrapper';
import AddResult from './addResult/AddResult';
import { PleaseWait } from './PleaseWait';
import { STATE_PENDING } from './configureDB';
import RaceConfiguration from './raceConfiguration/RaceConfiguration';

class App extends Component {
  render () {
    const coverClass = ''; // hasMessage ? 'coverUp' : '';
    if (this.props.config_found === STATE_PENDING) {
      return <PleaseWait />;
    }

    return (
      <ConnectedRouter history={history} basename={window.location.pathname}>
        <div>
          {Object.keys(this.props.errors).map(ekey => (
            <Alert variant='danger' key={ekey}>{this.props.errors[ekey]}</Alert>
          ))}
          <Navbar variant='dark' bg='dark' className={coverClass}>
            <Navbar.Brand as={NavLink} to='/' exact>
              {this.props.title}
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={NavLink} to='/' exact>
              All Entries
              </Nav.Link>
              <Nav.Link as={NavLink} to='/entry/0' exact>
              Entry Form
              </Nav.Link>
              <Nav.Link as={NavLink} to='/results' exact>
              All Results
              </Nav.Link>
              <Nav.Link as={NavLink} to='/result/0' exact>
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
            <Route path='/' exact component={AllEntriesWrapper} />
            <Route path='/entry/:entryId' exact component={EntryForm} />
            <Route path='/results' exact component={AllResultsWrapper} />
            <Route path='/result/:boatNumber' exact component={AddResult} />
            <Route path='/raceConfiguration' exact component={RaceConfiguration} />
            <Route component={PleaseWait} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    config_found: state.configReducer.config_found,
    config: state.configReducer.config,
    title: state.configReducer.config.race_name || 'Race Entries/Results',
    errors: state.errorReducer.errors
  };
};
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
