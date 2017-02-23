import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsActions from './actions';
import LogList from '../../components/LogList';
import { fromJS } from 'immutable';

class Logger extends Component {

  static propTypes = {
    scope: React.PropTypes.string.isRequired,
    messages: React.PropTypes.object,
  };

  render() {
    const messages = this.props.messages.get(this.props.scope) || fromJS([]);
    return (
      <LogList name="Scanner log" list={messages}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.logger,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SetsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logger);
