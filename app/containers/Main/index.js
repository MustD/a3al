import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app } from 'electron';
import storage from 'electron-json-storage';

import * as MainActions from './actions';
import child_process from 'child_process';

import MainPage from '../../components/MainPage';
import Nav from '../../components/NavMenu';
import Sets from '../Sets';
import Mods from '../Mods';

class Main extends Component {

  static propTypes = {
    mainState: React.PropTypes.object,
    setsState: React.PropTypes.object,
    modsState: React.PropTypes.object,
    setState: React.PropTypes.func,
    activate: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      nav: 'sets',
    }
  }

  navigate(target) {
    this.setState({nav: target})
  }

  save() {
    storage.set('a3al_data', {
      main: this.props.mainState.toJS(),
      sets: this.props.setsState.toJS(),
      mods: this.props.modsState.toJS(),
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
    let command = 'steam -applaunch 107410';
    if(this.props.setsState.hasIn(['sets', active, 'modList']) && this.props.setsState.getIn(['sets', active, 'modList']).size){
      command += ' -mod="';
      this.props.setsState.getIn(['sets', active, 'modList'])
        .forEach(item => command += `${this.props.modsState.getIn(['mods', item, 'name'])}\\\\;`);
      command += '"'
    }
    return command;
  }

  getContent(){
    if(this.state.nav === 'sets'){
      return (<Sets />);
    }else if(this.state.nav === 'mods'){
      return (<Mods />);
    }
    return (<Sets />);
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
        <Nav active={this.state.nav} navigate={(target) => this.navigate(target)}  />
        {this.getContent()}
      </MainPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    mainState: state.main,
    setsState: state.sets,
    modsState: state.mods,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MainActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
