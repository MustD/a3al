/**
 * Created by md on 10.09.16.
 */
import { SET_STATE } from '../Main/actions';
import {
  ADD_SET,
  REMOVE_SET,
  UPDATE_SET,
  ACTIVATE,
} from './actions';
import { Record, fromJS } from 'immutable';

const initialState = fromJS({
  active: '',
  sets: {},
});

const modSet = Record({ id: '', name: '', command: '' });

export default function setReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return fromJS(action.data.sets);

    case ACTIVATE:
      return state.set('active', action.id);

    case ADD_SET:
      return state.update('sets', (map) => map.set(action.id,
        new modSet({
          id: action.id,
          name: `new set ${map.size + 1}`,
          command: '',
        })
      ));

    case REMOVE_SET:
      return state.removeIn(['sets', action.id]);

    case UPDATE_SET:
      return state.setIn(['sets', action.id], action.data);

    default:
      return state;
  }
}
