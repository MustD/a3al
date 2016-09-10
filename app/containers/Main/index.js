import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app } from 'electron';
import storage from 'electron-json-storage';

import * as MainActions from './actions';
import child_process from 'child_process';

import MainPage from '../../components/MainPage';
import Mods from '../../components/Mods';

class Main extends Component {

  static propTypes = {
    mainState: React.PropTypes.object,
    setState: React.PropTypes.func,
    addMod: React.PropTypes.func,
  };

  save() {
    storage.set('a3al_data', this.props.mainState.toJS());
  }

  load() {
    storage.get('a3al_data', (error, data) => {
      data ? this.props.setState(data) : '';
    });
  }

  run() {
    child_process.execSync('steam -applaunch 107410');
  }

  render() {
    return (
      <MainPage
        run={() => this.run()}
        save={() => this.save()}
        load={() => this.load()}
      >
        <Mods
          list={this.props.mainState.get('mods').toJS()}
          addMod={this.props.addMod}
        />
      </MainPage>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
