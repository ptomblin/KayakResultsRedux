import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';

import { Title } from './title/Title';
import { EntryForm } from './entryForm/EntryForm';
import { AllEntries } from './allEntries/AllEntries';
import { AddResult } from './addResult/AddResult';
import { AllResults } from './allResults/AllResults';
import { PleaseWait } from './PleaseWait';
import { STATE_PENDING } from './configureDB';

class App extends Component {
  render () {
    const hasMessage = !!this.props.error_message;
    const coverClass = hasMessage ? 'coverUp' : '';
    if (this.props.config_found === STATE_PENDING) {
      return <PleaseWait />;
    }

    return (
      <div>
        <Title />
        <Container fluid='true'>
          <Alert variant='danger' show={hasMessage}>{this.props.error_message}</Alert>
          <Tabs mountOnEnter unmountOnExit className={coverClass}>
            <Tab eventKey='entry-form' title='Entry Form'>
              <EntryForm />
            </Tab>
            <Tab eventKey='entries' title='Entries'>
              <AllEntries />
            </Tab>
            <Tab eventKey='add-result' title='Add Result'>
              <AddResult />
            </Tab>
            <Tab eventKey='results' title='All Results'>
              <AllResults />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  config_found: state.appReducer.config_found,
  config: state.appReducer.config,
  error_message: state.appReducer.error_message
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
