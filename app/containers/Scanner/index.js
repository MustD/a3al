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
    workshopMods: React.PropTypes.object,
  };

  setArmaFolder(path){
    const armaRoot = new FolderArmaRoot(path);
    armaRoot.setPath(path);
    const isValid = armaRoot.isValid();
    this.props.setArmaFolder(path, isValid);
  }

  scanWorkshop(){
    //@todo: implement
    console.log('workshop scan')
  }

  render() {
    return (
     <div>
       <Folder
         setPath={(path) => this.setArmaFolder(path)}
         path={this.props.armaRoot.get('path')}
         isValid={this.props.armaRoot.get('isValid')}
       />
       <Workshop mods={this.props.workshopMods} rescan={() => this.scanWorkshop()} />
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
    workshopMods: state.scanner.get('workshopMods'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ScannerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
