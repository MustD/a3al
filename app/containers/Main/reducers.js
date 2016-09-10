/**
 * Created by md on 10.09.16.
 */
import {
  SET_STATE,
  ADD_MOD,
} from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  mods: [],
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return fromJS(action.data);

    case ADD_MOD:
      return state.update('mods', (list) => list.push(
        {
          id: action.id,
          name: `new set ${list.size}`,
          command: '',
        }
      ));

    default:
      return state;
  }
}
