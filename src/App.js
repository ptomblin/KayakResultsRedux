import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction';
import Container from 'react-bootstrap/Container';
import Tabs  from 'react-bootstrap/Tabs';
import Tab  from 'react-bootstrap/Tab';
import { Title } from './title/Title';
import { EntryForm } from './entryForm/EntryForm';
import { AllEntries } from './allEntries/AllEntries';
import { AddResult } from './addResult/AddResult';
import { AllResults } from './allResults/AllResults';

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render () {
    return (
      <div>
      <Title/>
      <Container fluid='true'>
      <Tabs mountOnEnter unmountOnExit>
        <Tab eventKey='entry-form' title="Entry Form">
          <EntryForm/>
        </Tab>
        <Tab eventKey='entries' title="Entries">
          <AllEntries/>
        </Tab>
        <Tab eventKey='add-result' title="Add Result">
          <AddResult/>
        </Tab>
        <Tab eventKey='results' title="All Results">
          <AllResults/>
        </Tab>
      </Tabs>
      </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
