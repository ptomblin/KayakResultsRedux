import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllResults from './AllResults';
import { fetchRaceEntries, clearRaceEntries } from '../actions/raceEntriesAction';
import { STATE_TRUE } from '../configureDB';
import { PleaseWait } from '../PleaseWait';

export class AllResultsWrapper extends Component {
  constructor (props) {
    super(props);
    this.state = { table: null };
  }

  componentDidMount () {
    this.props.onEntry();
  }

  componentWillUnmount () {
    this.props.onExit();
  }

  render () {
    if (this.props.entries_status !== STATE_TRUE) {
      return <PleaseWait />;
    }
    return <AllResults />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entries_status: state.raceEntriesReducer.entries_status
  };
};
const mapDispatchToProps = dispatch => ({
  onEntry: () => {
    dispatch(fetchRaceEntries());
  },
  onExit: () => {
    dispatch(clearRaceEntries());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllResultsWrapper);
