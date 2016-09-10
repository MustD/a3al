import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainPage from '../../components/wrappers/MainPage';
import * as MainActions from './actions';

class Main extends Component {

  static propTypes = {
    mainState: React.PropTypes.object,
    increment: React.PropTypes.func,
    decrement: React.PropTypes.func,

  };

  componentWillReceiveProps(nextProps){
    console.warn(nextProps);
  }

  render() {
    return (
      <MainPage
        counter={this.props.mainState.get('counter')}
        add={this.props.increment}
        remove={this.props.decrement}
      />
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
