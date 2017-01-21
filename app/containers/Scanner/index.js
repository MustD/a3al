import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ScannerActions from './actions';
import Folder from '../../components/ArmaFolder';
import Workshop from '../../components/WorkshopMods';
import UserMods from '../../components/UserMods';
import FolderArmaRoot from '../../api/FolderArmaRoot';

import RaisedButton from 'material-ui/RaisedButton';

class Scanner extends Component {

  static propTypes = {
    setArmaFolder: React.PropTypes.func,
    armaRoot: React.PropTypes.object,
  };

  setArmaFolder(path){
    const armaRoot = new FolderArmaRoot(path);
    armaRoot.setPath(path);
    const isValid = armaRoot.isValid();
    this.props.setArmaFolder(path, isValid);
  }

  render() {
    return (
     <div>
       <Folder
         setPath={(path) => this.setArmaFolder(path)}
         path={this.props.armaRoot.get('path')}
         isValid={this.props.armaRoot.get('isValid')}
       />
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
    armaRoot: state.scanner.get('armaRoot'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ScannerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
