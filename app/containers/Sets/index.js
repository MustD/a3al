import React, { Component } from 'react';
import { fromJS } from 'immutable';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsActions from './actions';

import SetManage from '../../components/SetManage';

class Sets extends Component {

  static propTypes = {
    setsState: React.PropTypes.object,
    modsState: React.PropTypes.object,
    scannerState: React.PropTypes.object,
    activate: React.PropTypes.func,
    addSet: React.PropTypes.func,
    removeSet: React.PropTypes.func,
    updateSet: React.PropTypes.func,
    runMod: React.PropTypes.func,
  };

  render() {
    const allMods = this.props.scannerState.get('importedMods').merge(this.props.modsState.get('mods'));

    return (
      <SetManage
        list={this.props.setsState.get('sets')}
        modList={allMods}
        active={this.props.setsState.get('active')}
        activate={this.props.activate}
        addSet={this.props.addSet}
        removeSet={this.props.removeSet}
        updateSet={this.props.updateSet}
        runMod={this.props.runMod}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    setsState: state.sets,
    modsState: state.mods,
    scannerState: state.scanner,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SetsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sets);
