import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app } from 'electron';
import storage from 'electron-json-storage';

import * as MainActions from './actions';
import child_process from 'child_process';

import MainPage from '../../components/MainPage';
import Sets from '../Sets';

class Main extends Component {

  static propTypes = {
    mainState: React.PropTypes.object,
    setsState: React.PropTypes.object,
    setState: React.PropTypes.func,
    activate: React.PropTypes.func,
  };

  save() {
    storage.set('a3al_data', {
      main: this.props.mainState.toJS(),
      sets: this.props.setsState.toJS(),
    });
  }

  load() {
    storage.get('a3al_data', (error, data) => {
      data ? this.props.setState(data) : '';
    });
  }

  run() {
    child_process.execSync('steam -applaunch 107410');
  }

  runMod() {
    child_process.execSync(this.getRunString());
  }

  getRunString() {
    const active = this.props.setsState.get('active');
    const command = this.props.setsState.getIn(['sets', active, 'command']);
    return `steam -applaunch 107410 ${command || ''}`;
  }

  render() {
    return (
      <MainPage
        run={() => this.run()}
        runMod={() => this.runMod()}
        save={() => this.save()}
        load={() => this.load()}
        command={this.getRunString()}
      >
        <Sets />
      </MainPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    mainState: state.main,
    setsState: state.sets,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MainActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
