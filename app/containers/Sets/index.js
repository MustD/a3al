import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsActions from './actions';

import SetManage from '../../components/SetManage';

class Sets extends Component {

  static propTypes = {
    activate: React.PropTypes.func,
    addSet: React.PropTypes.func,
    removeSet: React.PropTypes.func,
    updateSet: React.PropTypes.func,
  };

  render() {
    return (
      <SetManage
        list={this.props.setsState.get('sets')}
        active={this.props.setsState.get('active')}
        activate={this.props.activate}
        addSet={this.props.addSet}
        removeSet={this.props.removeSet}
        updateSet={this.props.updateSet}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    setsState: state.sets,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SetsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sets);