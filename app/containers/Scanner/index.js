import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ScannerActions from './actions';
import Folder from '../../components/ArmaFolder';
import Workshop from '../../components/WorkshopMods';
import UserMods from '../../components/UserMods';

import RaisedButton from 'material-ui/RaisedButton';

class Scanner extends Component {

  static propTypes = {
    tmp: React.PropTypes.func,
  };

  render() {
    return (
     <div>
       <Folder path={'/home/user/Arma3'}/>
       <Workshop path={'/home/user/workshop'}/>
       <UserMods path={'/home/user/workshop'}/>
       <div>
         <RaisedButton
           label={'IMPORT'}
           onMouseUp={() => {}}
           secondary={true}
         />
       </div>
     </div>
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
