import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import * as ScannerActions from './actions';
import Folder from '../../components/ArmaFolder';
import Workshop from '../../components/WorkshopMods';
import UserMods from '../../components/UserMods';
import FolderArmaRoot from '../../api/FolderArmaRoot';
import FolderArmaWorkshop from '../../api/FolderArmaWorkshop';

import RaisedButton from 'material-ui/RaisedButton';
import ModScanner from '../../api/ModScanner';
import { generateId } from '../../utils/common';

class Scanner extends Component {

  static propTypes = {
    setArmaFolder: React.PropTypes.func,
    armaRoot: React.PropTypes.object,
    workshopMods: React.PropTypes.object,
    setWorkshopMods: React.PropTypes.func,
  };

  setArmaFolder(path){
    const armaRoot = new FolderArmaRoot(path);
    armaRoot.setPath(path);
    const isValid = armaRoot.isValid();
    this.props.setArmaFolder(path, isValid);
  }

  scanWorkshop(){
    //@todo: implement
    const workshopPath = new FolderArmaWorkshop();
    workshopPath.setPathFromArma(this.props.armaRoot.get('path'));
    const result = fromJS(ModScanner.scanForMods(workshopPath.getPath()));
    const mods = fromJS({}).asMutable();
    result.forEach((value) => {
      const id = generateId();
      mods.set(id, {id, name: value.get(4), path: value.get(0)})
    });
    this.props.setWorkshopMods(mods);
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
