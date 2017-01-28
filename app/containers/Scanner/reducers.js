/**
 * Created by md on 14.01.17.
 */

import FolderArmaRoot from '../../api/FolderArmaRoot';

import {
  SET_ARMA_FOLDER,
  SET_WORKSHOP_MOD_LIST,
} from './actions';

import { fromJS, OrderedMap } from 'immutable';

const initialState = fromJS({
  armaRoot: {
    path: (new FolderArmaRoot()).getPath(),
    isValid: false,
  },
  importedMods: new OrderedMap(),
});

export default function scannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARMA_FOLDER:
      return state.update('armaRoot', (map) => map.set('path', action.path).set('isValid', action.isValid));
    case SET_WORKSHOP_MOD_LIST: {
      return state.set('importedMods', action.mods)
    }
    default:
      return state;
  }
}
