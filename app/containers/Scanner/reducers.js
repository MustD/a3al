/**
 * Created by md on 14.01.17.
 */

import FolderArmaRoot from '../../api/FolderArmaRoot';

import {
  SET_ARMA_FOLDER,
  SET_WORKSHOP_MOD_LIST,
} from './actions';

import { fromJS, OrderedMap } from 'immutable';

const workshopMod = Record({ id: '', name: '', path: ''});

const initialState = fromJS({
  armaRoot: {
    path: (new FolderArmaRoot()).getPath(),
    isValid: false,
  },
  workshopMods: new OrderedMap(),
});

export default function scannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARMA_FOLDER:
      return state.update('armaRoot', (map) => map.set('path', action.path).set('isValid', action.isValid));
    case SET_WORKSHOP_MOD_LIST: {
      const newWorkshopMods = new OrderedMap().asMutable();
      action.mods.forEach((value) => {
        newWorkshopMods.set(value.id, new workshopMod({
          id: value.id,
          name: value.name,
          path: value.path,
        }));
      });
      return state.set('workshopMods', newWorkshopMods)
    }
    default:
      return state;
  }
}
