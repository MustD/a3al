import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import * as ScannerActions from './actions';
import Folder from '../../components/ArmaFolder';
import ModImport from '../../components/ModImport';
import FolderArmaRoot from '../../api/FolderArmaRoot';
import FolderArmaWorkshop from '../../api/FolderArmaWorkshop';

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

  scanAndImport(){
    const workshopPath = new FolderArmaWorkshop();
    workshopPath.setPathFromArma(this.props.armaRoot.get('path'));
    const result = fromJS(ModScanner.megaScan(this.props.armaRoot.get('path'), workshopPath.getPath()));
    const mods = fromJS({}).asMutable();
    result.forEach((value) => {
      const id = generateId();
      mods.set(id, fromJS({id, name: value}));
    });
    this.props.setWorkshopMods(result);
  }

  render() {
    return (
     <div>
       <Folder
         setPath={(path) => this.setArmaFolder(path)}
         path={this.props.armaRoot.get('path')}
         isValid={this.props.armaRoot.get('isValid')}
       />
       <ModImport importMods={() => this.scanAndImport()} list={this.props.importedMods} />
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
