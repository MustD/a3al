import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ScannerActions from './actions';

class Scanner extends Component {

  static propTypes = {
    tmp: React.PropTypes.func,
  };

  render() {
    return (
     <div>hello scanner</div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ScannerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
