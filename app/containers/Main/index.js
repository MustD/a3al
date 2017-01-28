import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app } from 'electron';
import storage from 'electron-json-storage';

import * as MainActions from './actions';
import child_process from 'child_process';

import MainPage from '../../components/MainPage';
import Sets from '../Sets';
import Mods from '../Mods';
import Scanner from '../Scanner';
import { fromJS } from 'immutable';

import {Tabs, Tab} from 'material-ui/Tabs';

class Main extends Component {

  static propTypes = {
    mainState: React.PropTypes.object,
    setsState: React.PropTypes.object,
    modsState: React.PropTypes.object,
    scannerState: React.PropTypes.object,
    setState: React.PropTypes.func,
    activate: React.PropTypes.func,
  };

  save() {
    storage.set('a3al_data', {
      main: this.props.mainState.toJS(),
      sets: this.props.setsState.toJS(),
      mods: this.props.modsState.toJS(),
      scanner: this.props.scannerState.toJS(),
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
    const allMods = fromJS({mods: this.props.scannerState.get('importedMods').merge(this.props.modsState.get('mods'))});
    const active = this.props.setsState.get('active');
    let command = 'steam -applaunch 107410';
    if(this.props.setsState.hasIn(['sets', active, 'modList']) && this.props.setsState.getIn(['sets', active, 'modList']).size){
      command += ' -mod="';
      this.props.setsState.getIn(['sets', active, 'modList'])
        .forEach(item => command += `${allMods.getIn(['mods', item, 'name'])}\\\\;`);
      command += '"'
    }
    return command;
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
        <Tabs>
          <Tab label="Mod sets" >
            <Sets runMod={() => this.runMod()} />
          </Tab>
          <Tab label="Mod pool" >
            <Mods />
          </Tab>
          <Tab label="Mod scanner" >
            <Scanner />
          </Tab>
        </Tabs>
      </MainPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    mainState: state.main,
    setsState: state.sets,
    modsState: state.mods,
    scannerState: state.scanner,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MainActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
