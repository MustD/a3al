/**
 * Created by md on 14.01.17.
 */

import FolderArmaRoot from '../../api/FolderArmaRoot';

import {
  SET_ARMA_FOLDER,
} from './actions';

import { fromJS } from 'immutable';

const initialState = fromJS({
  armaRoot: {
    path: (new FolderArmaRoot()).getPath(),
    isValid: false,
  }
});

export default function scannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARMA_FOLDER:
      return state.update('armaRoot', (map) => map.set('path', action.path).set('isValid', action.isValid));
    default:
      return state;
  }
}
