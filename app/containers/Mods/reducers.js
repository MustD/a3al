/**
 * Created by md on 10.09.16.
 */
import { SET_STATE } from '../Main/actions';
import {
  ADD_MOD,
  REMOVE_MOD,
} from './actions';
import { Record, fromJS, OrderedMap } from 'immutable';

const initialState = fromJS({
  mods: new OrderedMap(),
});

const mod = Record({ id: '', name: ''});

export default function modsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return fromJS({
        mods: new OrderedMap(fromJS(action.data.mods.mods)),
      });

    case ADD_MOD:
      return state.update('mods', (map) => map.set(action.id,
        new mod({
          id: action.id,
          name: action.name,
        })
      ));

    case REMOVE_MOD:
      return state.removeIn(['mods', action.id]);

    default:
      return state;
  }
}
