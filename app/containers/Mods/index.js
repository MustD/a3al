import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app } from 'electron';

import * as MainActions from './actions';
import ModManage from '../../components/ModManage';
class Mods extends Component {

  static propTypes = {
    modsState: React.PropTypes.object,
    addMod: React.PropTypes.func,
    removeMod: React.PropTypes.func,
  };


  render() {
    return (
     <ModManage addMod={this.props.addMod} removeMod={this.props.removeMod} list={this.props.modsState.get('mods')} />
    );
  }
}

function mapStateToProps(state) {
  return {
    modsState: state.mods,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MainActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Mods);
