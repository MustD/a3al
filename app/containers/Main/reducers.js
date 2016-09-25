/**
 * Created by md on 10.09.16.
 */
import {
  SET_STATE,
  ADD_MOD,
  REMOVE_MOD,
  ACTIVATE,
  UPDATE_MOD,
} from './actions';
import { Record, fromJS } from 'immutable';

const initialState = fromJS({
  active: '',
  mods: {},
});

const modSet = Record({ id: '', name: '', command: '' });

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return fromJS(action.data);

    case ACTIVATE:
      return state.set('active', action.id);

    case ADD_MOD:
      return state.update('mods', (map) => map.set(action.id,
        new modSet({
          id: action.id,
          name: `new set ${map.size + 1}`,
          command: '',
        })
      ));

    case REMOVE_MOD:
      return state.removeIn(['mods', action.id]);

    case UPDATE_MOD:
      return state.setIn(['mods', action.id], action.data);

    default:
      return state;
  }
}
