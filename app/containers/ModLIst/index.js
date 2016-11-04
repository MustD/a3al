import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app } from 'electron';
import storage from 'electron-json-storage';

import * as MainActions from './actions';
import child_process from 'child_process';

import MainPage from '../../components/MainPage';
import SetManage from '../../components/SetManage';

class ModList extends Component {

  static propTypes = {

  };


  render() {
    return (
     <div></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mainState: state.mainReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MainActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModList);
